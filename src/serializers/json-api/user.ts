

export default{
    name : 'users',
    schema:{
        data : {
            type(){
                return 'users'
            },
            id({data}){
                let id = data.userId || data.id;
                return id.toString();
            },
            attributes({data}){
                let attributes = {
                    email : data.email,
                    name : data.name,
                    phoneNumber : data.phoneNumber,
                    termsAcceptedAt: data.termsAcceptedAt,
                };

                return attributes;
            }
        }
    }
}