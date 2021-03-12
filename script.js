#!/usr/bin/env node

let cmds = process.argv.slice(2);
const fs = require("fs");

function wcat(cmds){
    let options = cmds.filter(function(data){ //return array with all commands starts with " - "
        return data.startsWith("-");
    });

    let files = cmds.filter(function(data){  //return array with all files
        return !data.startsWith("-");
    });

    if(files.length == 0){                    // check if there is any file or not
        console.log("Please specify file name");
        return;
    }
    for(i in files){
        if(!fs.existsSync(files[i])){               // checks if given file exists or not
            console.log(files[i]+" does not exits");
            return;
    }

    //writting commands
    if(options.includes("-w")){      //this commands will write file1 data into file2
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-w") != 1){
            console.log("command not found");
            return;
        }
        let data = fs.readFileSync(files[0],"utf-8");  
        fs.writeFileSync(files[1],data);
        return;
    }else if(options.includes("-a")){     //this commands will append file1 data into file2
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-a") != 1){
            console.log("command not found");
            return;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        let data1 = fs.readFileSync(files[1],"utf-8");
        fs.writeFileSync(files[1],data1+data);
        return;
    }else if(options.includes("-ws")){     //this commands will write file1 data into file2 without null lines
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-ws") != 1){
            console.log("command not found");
            return;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        let lines = data.split("\r\n");
        let str = " ";
        for(l in lines){
            str += lines[l]+" ";
        }
        fs.writeFileSync(files[1],str);
        return;
    }


    //reading commands
    let count = 1;
    for(i in files){
        let data = fs.readFileSync(files[0],"utf-8");   //reading files
        if(options.includes("-s")){     //this commands will print lines without space
            let lines = data.split("\r\n");
            for(j in lines){
                if(lines[j] != ""){
                    if(options.include("-n")){
                        console.log(count+" "+lines[j]);
                        count++;
                    }else{
                        console.log(lines[j]);
                    }
                }
            }
        }else if(options.includes("-n")){    //this commands will print lines with sequence number without space
            let lines = data.split("\r\n");
            for(j in lines){
                console.log(count+" "+lines[j]);
                count++;
            }
        }else if(options.includes("-b")){   //this commands will print only non-null lines with sequence number without space
            let lines = data.split("\r\n");
            for(j in lines){
                console.log(count+" "+lines[j]);
                count++;
            }
        }
        else{
            console.log(data);        //if not any command is given then simply print file data
        }
    }

}
}

wcat(cmds);