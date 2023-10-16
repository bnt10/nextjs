import { spawn } from 'child_process'
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Express 라우터 설정
  server.all('*', (req, res) => {
    return handle(req, res) // 모든 요청을 Next.js에게 위임
  })

  // etcd 실행 (이 부분에서 etcd 실행 옵션 및 경로를 설정할 수 있습니다)
  const etcd = spawn('./etcd.exe', [
    '--listen-client-urls',
    'http://localhost:2379', // etcd 클라이언트 URL
    '--advertise-client-urls',
    'http://localhost:2379', // etcd 클라이언트 광고 URL
    // ...기타 etcd 옵션
  ])

  etcd.stdout.on('data', (data) => {
    console.log(`etcd stdout: ${data}`)
  })

  etcd.stderr.on('data', (data) => {
    console.error(`etcd stderr: ${data}`)
  })

  etcd.on('close', (code) => {
    console.log(`etcd 서버가 종료되었습니다: ${code}`)
  })

  // Express 서버 시작
  const port = 8000 // 원하는 포트로 변경 가능
  server.listen(port, (err?: unknown) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
