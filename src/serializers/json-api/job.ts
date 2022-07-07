export default{
    name : 'jobs',
    schema : {
        data : {
            type(){
                return 'jobs'
            },
            id({data}){
                return data.id.toString();
            },
            untransformAttributes({attributes}){
                return attributes;
            },
            attributes({data}){
                let attributes ={
                    title : data.title,
                    description : data.description,
                    displayUrl : data.displayUrl
                };
                return attributes;
            }
        }
    }
}