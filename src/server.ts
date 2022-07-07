import server from './server-setup';




let port = process.env.PORT || 8081;

if(!port){
    throw new Error('Port is required,but missing');
}

let host = '127.0.0.1';

let options = {
    port : Number(port),
    host
}

server.listen(options,async(err,address)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
})

export default server;