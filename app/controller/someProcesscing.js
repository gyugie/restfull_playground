exports.start = function(req, res){
  var data = [];
    Promise.all([
        process1(),
        process2(),
        process3()
    ])
    .then(data => {

        console.log(data);
    });

}

function process1(){
  
    var user = [];

   results =  new Promise((resolve, reject) => {
                setTimeout(() => {
                    user = [
                        {id: 1, name: 'dadang', age: 12, gender: 'male'},
                        {id: 2, name: 'uajng', age:15, gender: 'male'},
                        {id: 3, name: 'nana', age:13, gender: 'female'}
                    ];
                    resolve(user);
                }, 5000)
            });

    return results;
}

function process2(){
    return addess = [
        {addess_id: 1, user_id:1, addess: 'jl. kahayang RT00/11'},
        {addess_id: 2, user_id:2, addess: 'jl. kaera RT00/11'},
        {addess_id: 3, user_id:3, addess: 'jl. kaembung RT00/11'},
    ]
}

function process3(){
    results =  new Promise((resolve, reject) => {
        setTimeout(() => {
            departmen = [
                {departmen_id: 1, user_id:1, departmen: 'IT'},
                {departmen_id: 2, user_id:2, departmen: 'Koki'},
                {departmen: 3, user_id:3, departmen: 'Admin'},
            ];
            resolve(departmen);
        }, 100)
    });

    return results;
}


