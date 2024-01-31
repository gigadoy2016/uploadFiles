export class Time{
    private date;
    constructor(){
        this.date = new Date();
    }

    public getFormattedDateTime(now) {
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
    
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
    public getDate(date){
        return this.getFormattedDateTime(date);
    }
    
}