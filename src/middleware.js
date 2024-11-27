/**
 *  run code before a request is completed
 * Next.js 12 在这个版本引入了中间件的概念，这就类似于 Koa 框架里面的中间件，
 * 它能让你通过代码来实现更灵活的操作，而不只是通过那些烦人的配置。
 * 在中间件里，你可以拿到用户的完整请求，然后你就可以对请求进行重写、重定向、添加 Header 等操作。
 * 中间件里也支持例如 fetch 这样的标准运行时 Web API
 */

import { NextResponse } from 'next/server';

export function middleware(request) {}
