import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from '../core/services/cookie.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpFileUploadOptions = {
  headers: new HttpHeaders()
};
// const baseurl = `http://localhost:3000/`;
// const baseurl = `https://api.proplegit.com/`;
// const baseurl = `http://devapi.proplegit.com/`;
const baseurl = `https://qaapi.proplegit.com/`;
const apiUrl = `${baseurl}api/`;
const register = `${apiUrl}login/register`;
const generateOTP = `${apiUrl}generate/otp/`;
const validateOTP = `${apiUrl}validate/otp/`;
const login = `${apiUrl}login/verify`;
const stateWiseProperty = `${apiUrl}property/list/`;
const PropertyListByState = `${apiUrl}property/list/`;
const deleteProperty = `${apiUrl}property/delete/`;
const stateInfo = `${apiUrl}state/list`;
const count = `${apiUrl}property/dashboard/count`;
const forgotPassword = `${apiUrl}Forgot/Password`;
const loginOTPVerify = `${apiUrl}login/otp/verify`;
const propertyTaxType = `${apiUrl}Property/Tax/List/`;
const generateinvoice = `${apiUrl}Property/rent/generate/invoice/`;
const uploadInvoice = `${apiUrl}property/rent/Upload/invoice/`;
const generateReceipt = `${apiUrl}property/rent/generate/receipt/`;
const getLoanType = `${apiUrl}loan/application/types`;
const getLoanpropertyType = `${apiUrl}loan/Property/types`;
const addLoanApplication = `${apiUrl}loan/application/create`;
const getApplicationInformation = `${apiUrl}loan/application/View/details/`;
const getDocumentList = `${apiUrl}loan/application/Documents/AppID/`;
const savePVR = `${apiUrl}loan/pvr/createBy/`;
const getPVRData = `${apiUrl}loan/pvr/View/`;
const getPVRBankList = `${apiUrl}loan/bank/list`;
const UploadPVR = `${apiUrl}loan/pvr/Genrate/`;
const assignLawyer = `${apiUrl}loan/assign/lawyer/`;
const markasReviewed = `${apiUrl}loan/property/document/reviewed/`;
const fordemo = `${apiUrl}loan/Property/all/Document/Upload/`;
const fordemochangestatus = `${apiUrl}loan/application/status/`;
const Dashboard = `${apiUrl}loan/Dashboard/Count`;
const cancelContract = `${apiUrl}property/tenant/ContractCancel/`;
const propertyTaxAlert = `${apiUrl}propertyAlerts/tax/Property/`;
const propertyRentAlert = `${apiUrl}propertyAlerts/rent/Property/`;
const propertyCaseDetails = `${apiUrl}property/case/details/`;
const propertyCaseTypes = `${apiUrl}property/legalcase/types/list`;
const generatePVR = `${apiUrl}loan/pvr/Genrate/merge/`;
const getallLoanID = `${apiUrl}loan/application/ALL/ID`;
const resendLoginOPT = `${apiUrl}single/generate/otp/`;
const excelExport = `${apiUrl}area/list/Distict/`;
const UserList = `${apiUrl}user/list/`;
const loanTypePVRStatus = `${apiUrl}loan/Dashboard/loantype/PVR/status/`;

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private userID: number;
  private user;
  private otpID;
  // tslint:disable-next-line: variable-name
  private _refresh = new Subject<void>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  userRegister(userData): any {
    return this.http.post(register, userData, httpOptions);
  }
  GetBaseUrl() {
    return apiUrl;
  }
  getUserID() {
    return this.userID;
  }
  reFresh() {
    return this._refresh;
  }

  getDashboard(): any {
    return this.http.get(count, httpOptions);
  }

  setUserID(userid: number) {
    this.userID = userid;
  }
  setOTPID(otp: number) {
    this.otpID = otp;
  }
  getOTPID() {
    return this.otpID;
  }

  generateOTP(id, data): any {
    return this.http.post(`${generateOTP}${id}`, data, httpOptions);
  }

  validateOTP(data): any {
    return this.http.post(validateOTP, data, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error}, ` + `body was: ${error.error}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  login(data) {
    return this.http.post<any>(login, data, httpOptions);
    // .pipe(map(user => {
    // tslint:disable-next-line: triple-equals
    //   if (user.error && user.status != 200) {
    //     return user;
    //   } else {
    //     this.user = user;
    //     this.cookieService.setCookie('currentUser', JSON.stringify(user.data[0]), 1);
    //     return user;
    //   }
    // }));
  }
  loginOTPVerify(data) {
    return this.http.post<any>(loginOTPVerify, data, httpOptions).pipe(
      map((user) => {
        // tslint:disable-next-line: triple-equals
        if (user.error && user.status != 200) {
          return user;
        } else {
          this.user = user;
          this.cookieService.setCookie(
            'currentUser',
            JSON.stringify(user.data[0]),
            1,
          );
          return user;
        }
      }),
    );
  }

  saveCookie(data) {
    this.cookieService.setCookie('currentUser', JSON.stringify(data), 1);
  }

  logout() {
    this.cookieService.deleteCookie('currentUser');
    this.user = null;
  }
  getcurrentUser() {
    return JSON.parse(this.cookieService.getCookie('currentUser'));
  }

  getStateWisePropertyCount(userId): any {
    return this.http.get(stateWiseProperty + userId, httpOptions);
  }

  getPropertyListByState(id): any {
    return this.http.get(`${PropertyListByState}${id}`, httpOptions);
  }
  deleteProperty(id): any {
    return this.http.delete(`${deleteProperty}${id}`, httpOptions);
  }
  states() {
    return this.http.get<any>(stateInfo, httpOptions);
  }
  districts(id): any {
    return this.http.get(`${apiUrl}district/list/${id}`, httpOptions);
  }
  talukas(id): any {
    return this.http.get(`${apiUrl}taluka/list/${id}`, httpOptions);
  }
  villages(id): any {
    return this.http.get(`${apiUrl}village/list/${id}`, httpOptions);
  }
  addproperty(data): any {
    return this.http.post(`${apiUrl}property/add`, data, httpOptions);
  }
  propertytype(): any {
    return this.http.get(`${apiUrl}propertytype/list`, httpOptions);
  }
  area(search): any {
    return this.http.get(`${apiUrl}area/list/` + search, httpOptions);
  }
  areabyid(id): any {
    return this.http.get(`${apiUrl}area/view/${id}`);
  }
  Addphotograph(PropertyID, data): any {
    return this.http.post(
      `${apiUrl}property/${PropertyID}/document/add`,
      data,
      httpFileUploadOptions,
    );
  }

  listphotograph(PropertyID): any {
    return this.http
      .get<any>(`${apiUrl}property/${PropertyID}/photograph`)
      .pipe(
        map((responce) => {
          if (responce.error && responce.status !== 200) {
            return responce;
          } else {
            return responce.data;
          }
        }),
      );
  }

  viewproperty(propertyID) {
    return this.http.get<any>(
      `${apiUrl}property/view/${propertyID}`,
      httpOptions,
    );
  }
  editproperty(propertyID, data) {
    return this.http.put<any>(
      `${apiUrl}property/update/${propertyID}`,
      data,
      httpOptions,
    );
  }
  addtax(PropertyID, data): any {
    return this.http.post(
      `${apiUrl}property/${PropertyID}/tax/add`,
      data,
      httpFileUploadOptions,
    );
  }
  addtaxconfirm(PropertyID, data): any {
    return this.http.post(
      `${apiUrl}property/${PropertyID}/tax/add?FileExistenceCheck=1`,
      data,
      httpFileUploadOptions,
    );
  }
  listLawyers(): any {
    return this.http.get<any>(`${apiUrl}lawyer/list`, httpOptions);
  }
  deleteLawyer(LawyerId): any {
    return this.http.delete<any>(`${apiUrl}lawyer/delete/${LawyerId}`);
  }
  addLawyer(data): any {
    return this.http.post<any>(`${apiUrl}lawyer/add`, data, httpOptions);
  }
  viewLawyer(LawyerId) {
    return this.http.get<any>(`${apiUrl}lawyer/view/${LawyerId}`, httpOptions);
  }
  updateLawyer(data, LawyerId): any {
    return this.http.put<any>(
      `${apiUrl}lawyer/update/${LawyerId}`,
      data,
      httpOptions,
    );
  }
  listTenant(id): any {
    return this.http.get<any>(`${apiUrl}property/${id}/rent/list`, httpOptions);
  }
  deleteTenant(PropertyRentId): any {
    return this.http.delete<any>(
      `${apiUrl}property/rent/delete/${PropertyRentId}`,
    );
  }
  addTenant(data, id): any {
    return this.http.post<any>(
      `${apiUrl}property/${id}/tenant/add`,
      data,
      httpFileUploadOptions,
    );
  }
  viewTenant(PropertyRentId) {
    return this.http.get<any>(
      `${apiUrl}property/rent/view/${PropertyRentId}`,
      httpOptions,
    );
  }
  updateTenant(data, PropertyRentId): any {
    return this.http.put<any>(
      `${apiUrl}property/rent/update/${PropertyRentId}`,
      data,
      httpOptions,
    );
  }
  fetchstatelist() {
    return this.http.get<any>(stateInfo, httpOptions);
  }
  areabystateid(StateId, Search, DistrictId?): any {
    if (DistrictId) {
      return this.http.get(
        `${apiUrl}area/list/state/${StateId}/district/area/${Search}?DistrictId=${DistrictId}`,
      );
    } else {
      return this.http.get(
        `${apiUrl}area/list/state/${StateId}/district/area/${Search}`,
      );
    }
  }

  uploadTaxReceipt(propertyid, taxid, data): any {
    return this.http.post(
      `${apiUrl}property/${propertyid}/tax/${taxid}/receipt/upload`,
      data,
      httpFileUploadOptions,
    );
  }
  uploadRentReceipt(rentid, data): any {
    return this.http.post(
      `${apiUrl}property/rent/Upload/receipt/${rentid}`,
      data,
      httpFileUploadOptions,
    );
  }
  getDocument(propertyid, id): any {
    return this.http.get(
      `${apiUrl}property/${propertyid}/Document/view/${id}`,
      httpOptions,
    );
  }
  forgotPassword(data): any {
    return this.http.post(`${forgotPassword}`, data, httpOptions);
  }
  submitForgotPassword(data): any {
    return this.http.put(`${forgotPassword}/update`, data, httpOptions);
  }
  getpropertytaxtypeList(id): any {
    return this.http.get(`${propertyTaxType}${id}`, httpOptions);
  }
  getRentList(id): any {
    return this.http.get(`${apiUrl}property/rent/view/${id}`, httpOptions);
  }
  GenerateInvoice(id, userId): any {
    return this.http.post(
      `${generateinvoice}${id}`,
      { CreatedBy: userId },
      httpOptions,
    );
  }
  UploadInvoice(PropertyRentID, data): any {
    return this.http.post(
      `${uploadInvoice}${PropertyRentID}`,
      data,
      httpFileUploadOptions,
    );
  }
  UploadInvoiceConfirm(PropertyRentID, data): any {
    return this.http.post(
      `${uploadInvoice}${PropertyRentID}?FileExistenceCheck=0`,
      data,
      httpFileUploadOptions,
    );
  }
  GenerateReceipt(id, data): any {
    return this.http.post(`${generateReceipt}${id}`, data, httpOptions);
  }
  addLegalCase(PropertyID, data) {
    return this.http.post<any>(
      `${apiUrl}property/${PropertyID}/case/add`,
      data,
      httpOptions,
    );
  }
  listLegalcase(id): any {
    return this.http.get<any>(`${apiUrl}property/${id}/case/list`, httpOptions);
  }
  GetLoanTypes() {
    return this.http.get<any>(`${getLoanType}`, httpOptions);
  }
  GetLoanPropertyTypes() {
    return this.http.get<any>(`${getLoanpropertyType}`, httpOptions);
  }
  AddLoanApplication(data) {
    return this.http.post<any>(`${addLoanApplication}`, data, httpOptions);
  }
  GetApplicationInformation(id) {
    return this.http.get<any>(`${getApplicationInformation}${id}`, httpOptions);
  }
  GetDocumentList(id): any {
    return this.http.get<any>(`${getDocumentList}${id}`, httpOptions);
  }
  SavePVR(data, id) {
    return this.http.post<any>(`${savePVR}${id}`, data, httpOptions);
  }
  GetPVRData(id): any {
    return this.http.get<any>(`${getPVRData}${id}`, httpOptions);
  }
  GeneratePVR(appid): any {
    return this.http.get<any>(`${generatePVR}${appid}`, httpOptions);
  }
  GetPVRBankList(): any {
    return this.http.get<any>(`${getPVRBankList}`, httpOptions);
  }
  UploadPVR(Appid, data): any {
    return this.http.post(`${UploadPVR}${Appid}`, data, httpFileUploadOptions);
  }
  AssignLawyer(AppId, LawyerID): any {
    return this.http.put(
      `${assignLawyer}${AppId}/${LawyerID}`,
      null,
      httpOptions,
    );
  }
  MarkAsReviewed(PropertyId, DocumentId) {
    return this.http.put(
      `${markasReviewed}${PropertyId}/${DocumentId}`,
      null,
      httpOptions,
    );
  }
  ForDemo(AppID): any {
    return this.http.get(`${fordemo}${AppID}`, httpOptions);
  }
  getLoanDashboard(data): any {
    return this.http.post(Dashboard, data, httpOptions);
  }
  changeStatus(appID, status): any {
    return this.http.put(
      fordemochangestatus + appID,
      { ApplicationStatus: status },
      httpOptions,
    );
  }
  CancelRentContract(tenantId): any {
    return this.http.put(`${cancelContract}${tenantId}`, null, httpOptions);
  }
  GetPropertyTaxAlert(PropertyID): any {
    return this.http.get(`${propertyTaxAlert}${PropertyID}`, httpOptions);
  }
  GetPropertyRentAlert(PropertyID): any {
    return this.http.get(`${propertyRentAlert}${PropertyID}`, httpOptions);
  }
  GetPropertyCaseDetails(caseID): any {
    return this.http.get(`${propertyCaseDetails}${caseID}`, httpOptions);
  }
  GetPropertyLegalCaseTypes(): any {
    return this.http.get(propertyCaseTypes, httpOptions);
  }
  AddLegalCaseAct(CaseID, data): any {
    return this.http.post(`${apiUrl}property/case/${CaseID}/CaseActs`, data, httpOptions);
  }
  GetLegalCaseLastHearing(CaseID): any {
    return this.http.get(`${apiUrl}property/case/${CaseID}/last-hearing`, httpOptions);
  }
  AddLegalCaseHearing(CaseID, data): any {
    return this.http.post(`${apiUrl}property/case/${CaseID}/next-hearing`, data, httpOptions);
  }
  AddPetitionerAndLawyer(CaseID, data): any {
    return this.http.post(`${apiUrl}property/case/${CaseID}/petitioner`, data, httpOptions);
  }
  AddRespondentAndLawyer(CaseID, data): any {
    return this.http.post(`${apiUrl}property/case/${CaseID}/respondent`, data, httpOptions);
  }
  GetPetitionerAndLawyer(CaseID): any {
    return this.http.get(`${apiUrl}property/case/${CaseID}/petitionersandlawyer`, httpOptions);
  }
  GetRespondentAndLawyer(CaseID): any {
    return this.http.get(`${apiUrl}property/case/${CaseID}/respondentsandlawyer`, httpOptions);
  }
  GetAllLoanID(StateName, DistrictName, TalukaName, VillageName, BankName, LoanType, LoanPropertyType): any {
    return this.http.post(`${getallLoanID}`, { StateName, DistrictName, TalukaName, VillageName, BankName, LoanType, LoanPropertyType }, httpOptions);
  }
  ChangeECResponce(CaseID): any {
    return this.http.put(`${apiUrl}loan/application/ECRequest/${CaseID}`, null, httpOptions);
  }
  ResendLoginOTP(UserID): any {
    return this.http.post(`${resendLoginOPT}${UserID}`, null, httpOptions);
  }
  GetExcelExportData(StateID): any {
    return this.http.get(`${excelExport}${StateID}`, httpOptions)
  }
  GetUser(UserID): any {
    return this.http.get(`${UserList}${UserID}`, httpOptions)
  }
  GetLoanTypePVRStatus(UserID): any {
    return this.http.get(`${loanTypePVRStatus}${UserID}`, httpOptions)
  }
}
