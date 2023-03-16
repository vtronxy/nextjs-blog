// req = HTTP incoming message, res = HTTP server response

// req: http.IncomingMessage 实例，一些预先构建的中间件 req.cookies/req.query/req.body
// res: http.ServerResponse 实例，以及一些 辅助函数
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}

// 不能与 Next export 一起使用

/**
 * 1. 不是单纯的扮演转发的作用 API through an API Route
 */

export const config = {}