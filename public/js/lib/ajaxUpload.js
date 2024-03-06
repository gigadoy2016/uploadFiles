class aUpload{
    static ELEMENT_NOT_FOUND = ' !! Obj not found !!';
    doc_id;
    fileID = 1;
    docID = 0;
    URL = '';

    constructor(element_id,URL){
        this.doc_id = element_id;
        this.URL = URL;
    }

    setURL(url){
        this.URL = url;
    }

    clickMoreFile(){
        const file_container = document.getElementById(this.doc_id);
        if(file_container !== null){
            const obj = document.createElement("INPUT");
            const obj_id = "f_"+this.fileID;
            obj.setAttribute("type", "file");
            obj.setAttribute("name", "files");
            obj.setAttribute("onchange","uploadFile(this,'"+obj_id+"')");
    
            const divObj = document.createElement("DIV");
            divObj.setAttribute("id", obj_id);
            divObj.setAttribute("class", "document_file");
            divObj.appendChild(obj);
    
            file_container.appendChild(divObj);
            this.fileID++;
        }else{
            console.log(this.ELEMENT_NOT_FOUND + '('+this.doc_id+')');
        }
    }

    async uploadFile(obj,file_id) {
        console.log('id:'+file_id);
        let formData = new FormData();
        const file = obj.files[0];
        console.log(file.name);
        
        formData.append("file", obj.files[0]);
        let ans = await fetch(URL, {
            method: "POST", 
            body: formData
        }).then(function(res){ 
            console.log(res.json());
        } ).catch(function(err){
            console.log(err);
        }).finally(async function(res){
            obj.remove();    
            this.newElement(file_id,file.name);
            console.log("--Final------");
        });
        console.log(ans.json());
    }

    newElement(file_id,fileName){
        let objDiv = document.getElementById(file_id);
        let objSpan = document.createElement("SPAN");
        objSpan.innerHTML = fileName;

        objDiv.appendChild(objSpan);
    }
}