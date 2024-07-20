<div align="center">

<img src="./docs/images/epass-black.png" width="150">

# ePass 回声通行证

回声实验室 Serverless 架构的统一认证系统

</div>

## 说明

这是一套基于 Cloudflare Serverless 生态的统一认证系统，前端（`/src`）与后端（`/functions`）使用 [Cloudflare Pages](https://developers.cloudflare.com/pages) 托管，数据库使用 [Cloudflare D1](https://developers.cloudflare.com/d1/)，人机验证使用 [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)，发信使用 [腾讯云 SES 服务](https://cloud.tencent.com/product/ses) 提供的 HTTP API

后端相关配置在 `/functions/_configs` 下，前端相关配置在 `/src/configs` 下；Cloudflare 相关服务配置在 `wrangler.toml`；Cloudflare D1 数据库建表 SQL 在 `schema.sql`

### 本地开发

1. 运行 `pnpm init-db:local` 初始化本地数据库（如果没有初始化过）
2. 运行 `pnpm dev:api` 在 `3001` 端口上启动 API 服务器
3. 运行 `pnpm dev:web` 在 `3000` 端口上启动 Vite，此时 API 将被反向代理到 `http://localhost:3000/api`

### 通过 GitHub Actions 部署

推送到 `main` 分支即可自动部署

### 通过命令部署

1. 运行 `pnpm build` 构建前端
2. 运行 `pnpm init-db:remote` 初始化远程数据库（如果没有初始化过）
3. 运行 `pnpm run deploy` 进行部署

## 接入说明

1. 使用管理员登陆 ePass，创建 App

   **`App Name`** App 名字，kebab-case 格式

   **`App Secret`** App 密钥，用于解密用户基本信息与授权 App 读写用户关联数据，32 位字母与数字

   **`Redirect URL`** 登陆成功后重定向到的 URL，加密用户基本信息 `sauce` 会拼接在 URL 中返回

   **`Attributes`** 可选 App 属性，JSON 字符串，目前可用属性有 `displayName`（ePass 中的显示名称）、`logoUrl`（ePass 中的 Logo 图片地址）

2. 业务前端把用户重定向到 `https://<ePass 域名>/<App Name>`，用户登陆后，携带加密用户基本信息 `sauce` 返回业务前端
3. 业务前端在 `Redirect URL` 接收 `sauce`，传递 `sauce` 到业务后端，接收 JWT
4. 业务后端接到 `sauce`，按照下述解密说明解密出用户基本信息，示例如下：
   ```jsonc
   {
     "userId": 10001, // 用户 ID
     "username": "example-user", // 用户名
     "displayName": "示例用户", // 用户展示名
     "email": "i@example.com", // 用户邮箱
     "issueDate": 1721441086, // `sauce` 签发时间戳
   }
   ```
5. **重要！** 业务后端校验 `sauce` 签发时间，应该不早于当前时间 5 秒，否则视为过期（可以根据具体情况调整）
6. 业务后端签发 JWT，返回给前端
7. 业务前端设置 JWT
8. 业务前端通过 `replace` 的方式跳转到登陆后页面（防止浏览器历史记录留下 `sauce`）

## `sauce` 解密说明

`sauce` 是加密后的用户基本信息，为 Base64URL 编码的二进制数据。

首先需要对 `sauce` 进行 Base64URL 解码，Base64URL 指的是 `+/` 被替换为 `-_` 的 Base64 变体，如果使用的 Base64 解码库不支持 Base64URL 解码，可以手动把 `-_` 替换为 `+/`，再进行 Base64 解码。

解码后的二进制数据前 12 字节为 `IV`，其余部分为密文 `Ciphertext`，使用 `App Secret`、`IV` 对 `Ciphertext` 使用 AES-256-GCM 解密为 UTF-8 字符串，即为用户基本信息 JSON。

### Python 示例

```python
import base64
from Crypto.Cipher import AES

def decrypt_sauce(app_secret, sauce):
    sauceBytes = base64.urlsafe_b64decode(sauce)
    iv = sauceBytes[:12]
    ciphertext = sauceBytes[12:]
    cipher = AES.new(app_secret.encode('utf-8'), AES.MODE_GCM, nonce=iv)
    # In AES-GCM, the actual ciphertext contains the authentication tag at the end (last 16 bytes)
    tag_position = -16
    plaintext = cipher.decrypt_and_verify(ciphertext[:tag_position], ciphertext[tag_position:])

    return plaintext
```
