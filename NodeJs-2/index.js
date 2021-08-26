const http = require('http')

const fs = require('fs')

const path = require('path')


const server = http.createServer((req,res)=>{
        if (req.method === 'GET'){
            if(req.url == '/'){
                res.writeHead(200,{
                    'Content-type':'text/html; charset=utf-8'
                })
                fs.readFile(
                    path.join(__dirname,'view','index.html'),'utf-8',
                    (err,data) => {
                        if (err) throw err
                        res.end(data)

                    }
                )
            }else if (req.url == '/about'){
                res.writeHead(200,{
                    'Content-type': 'text/html'
                })

                fs.readFile(
                    path.join(__dirname,'view','about.html'), 'utf-8',
                    (err, data) => {
                        if (err) throw err
                        res.end(data)

                    }
                )
            }else if (req.url == '/api/users'){
                res.writeHead(200,{
                    'Content-type': 'text/json',
                    'Access-Control-Allow-Origin':'http://localhost:8080'
                })
                let users = [
                    {title:'Nodir', age:25},
                    {title:'Doniyor', age:30}
                ]
                res.write(JSON.stringify(users))
                res.end()
            }
        }else if (req.method === 'POST'){
            const body = []
            res.on('data',data=>{
                body.push(Buffer.from(data))
            })

            res.on('end', ()=>{
                const d = body.toString().split('&')
                const title = d[0].split('=')[1]
                const phone = d[1].split('=')[1]
                console.log(body.toString());
                console.log(d)
                console.log(title)
                console.log(phone)

                res.end(`
                <h1>Title: ${title}</h1>
                <h2>Phone: ${phone}</h2>
                <hr>
                <a href='/'>Bosh sahifa<a/>
                `)
            })
            
        }
    })

server.listen(3000,()=>{
    console.log('Server Ishga tushdi....');
})
