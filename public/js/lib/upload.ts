class Upload{
    private doc_id:string;
    private fileID:number = 1;
    private docID:number = 0;
    private URL:string = '';
    private ELEMENT_NOT_FOUND:string = ' !! Obj not found !!';

    constructor(element_id:string,URL:string){
        this.doc_id = element_id;
        this.URL = URL;
    }

    public setURL(url:string){
        this.URL = url;
    }

    public clickMoreFile():void{
        const file_container:HTMLElement|null = document.getElementById(this.doc_id);
        if(file_container !== null){
            const obj:HTMLElement = document.createElement("INPUT");
            const obj_id:string = "f_"+this.fileID;
            obj.setAttribute("type", "file");
            obj.setAttribute("name", "files");
            obj.setAttribute("onchange","uploadFile(this,'"+obj_id+"')");
    
            const divObj:HTMLElement = document.createElement("DIV");
            divObj.setAttribute("id", obj_id);
            divObj.setAttribute("class", "document_file");
            divObj.appendChild(obj);
    
            file_container.appendChild(divObj);
            this.fileID++;
        }else{
            console.log(this.ELEMENT_NOT_FOUND + '('+this.doc_id+')');
        }        
    }

    private newElement(file_id:string,fileName:string):void{
        const objDiv:HTMLElement|null = document.getElementById(file_id);
        const objSpan:HTMLElement = document.createElement("SPAN");
        objSpan.innerHTML = fileName;

        if(objDiv !== null){
            objDiv.appendChild(objSpan);
        }else{
            console.log(this.ELEMENT_NOT_FOUND + '('+file_id+')');
        }
    }

    public async uploadFile(obj:HTMLElement,file_id:string) {
        console.log('id:'+file_id);
        let formData = new FormData();
        // const file:any = <HTMLInputElement>obj.files[0];
    }
}