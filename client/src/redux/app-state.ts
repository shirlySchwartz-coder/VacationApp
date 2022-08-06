import IUser from "../Models/IUser";
import IVacation from "../Models/IVacation";


export  class AppState {
    public vacations: IVacation[] = [];  
    public users: IUser[] = [];  
     
}