import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { NameTypeResponse } from 'src/app/models/nameTypeResponse';
import { AttributeCategoriesService } from 'src/app/services/attribute-categories.service';

@Component({
  selector: 'app-attribute-categories',
  templateUrl: './attribute-categories.component.html',
  styleUrls: ['./attribute-categories.component.css']
})
export class AttributeCategoriesComponent implements OnInit {
  patientCharacteristicsSubAttributes: any = [
    {name: "Age", count: 200, values:['21-30', '31-40','41-50','51-60','61-70','71-80','81-90','91-100'], placeholder: 'Select Age' },
    {name: "Gender", count: 200, values:['Male', 'Female', 'Other(hermaphrodite)', 'Transsexual, NOS', 'Transsexual, natal male','Transsexual, natal female','not stated(unknown)'], placeholder: 'Select Gender'  },
    {name: "Race", count: 200, values:['White', 'Black', 'American Indian/Alaska Native', 'Chinese','Japanese','Filipino','Hawaiian','Korean','Vietnamese','Laotian','Hmong', 'Kampuchean','Thai','Asian Indian or Pakistani, NOS','Asian Indian','Pakistani','Micronesian, NOS','Chamorran','Guamanian, NOS','Polynesian, NOS','Tahitian','Samoan','Tongan','Melanesian, NOS','Fiji Islander','New Guinean','Other Asian','Pacific Islander, NOS','Other','Unknown'], placeholder: 'Select Race'  },
    {name: "Ethnicity", count: 200, values:['Non-Spanish, Non-Hispanic', 'Mexican (Including Chicano, NOS)', 'Puerto Rican', 'South Or Central American (Except Brazil)', 'Other Specified Spanish Origin','Spanish, NOS; Hispanic, NOS; Latino, NOS','Spanish Surname Only','Dominican Republic','Unknown Whether Spanish Or Not','Unknown'], placeholder: 'Select Ethnicity'  },
    {name: "Alcohol history", count: 200, values:['No History Of Alcohol Use', 'Current Use Of Alcohol','Past History Of Alcohol Use','Alcohol Usage Unknown','Blank'], placeholder: 'Select Alcohol history' },
    {name: "Tobacco history", count: 200, values:['Never Used', 'Cigarette Smoker, Current','Cigar / Pipe Smoker, Current','Snuff / Chew / Smokeless, Current','Combination Use, Current','Previous Use','Unknown','Blank'], placeholder: 'Select Tobacco History' },
    {name: "Vital Status", count: 200, values:['Dead', 'Alive','Unknown','Blank'],  placeholder: ' Select Vital Status' },
    {name: "Payors", count: 200, values:['Not insured', 'Not insured, self-pay','Insurance, NOS','Private Insurance: Managed Care/HMO/PPO','Medicaid','Medicaid: via Managed Care plan','Medicare w/o supp; Medicare, NOS','Medicare w/ supp, NOS','Medicare: via Managed Care plan','Medicare w/ private supp','Medicare w/ Medicaid eligibility','TRICARE','Veterans Affairs','Unknown','Blank'],  placeholder: 'Select Payors' },
    //End of Patient Demo
    //Begining of ICD Site Codes
    {name: "ICD Site Codes", count: 200, values:['C50.0 - Nipple', 'C50.1 - Breast, central portion','C50.2 - Breast, upper-inner quadrant','C50.3 - Breast, lower-inner quadrant','C50.4 - Breast, upper-outer quadrant','C50.5 - Breast, lower-outer quadrant','C50.6 - Breast, axillary tail','C50.8 - Breast, overlapping lesion','C50.9 - Breast, NOS'],  placeholder: ' Select ICD Site Codes' }, 
    //End of ICD Site Codes
    //Begining of Histology
    {name: "Breast cancer Subtype", count: 200, values:['ER or PR+/HER2-', 'ER or PR+/HER2+', 'ER and PR-/HER2+', 'TPBC', 'TNBC'], placeholder: 'Select Breast cancer Subtype' },
    {name: "Stage (AJCC) at diagnosis", count: 200, values:['0 (in Situ)', 'I', 'II', 'III', 'IV'],  placeholder: 'Select Stage (AJCC) at diagnosis' },
  ]
  classofcaseSubAttributes: any = [
  //Begining of Class of Case
  {name: "Class of Case", count: 200, values:['Initial diagnosis at the reporting facility AND all treatment or a decision not to treat was done elsewhere', 'Initial diagnosis at the reporting facility or in a staff physician?s office AND part or all of first course treatment or a decision not to treat was at the reporting facility, NOS','Initial diagnosis at the reporting facility AND part of first course treatment was done at the reporting facility','Initial diagnosis at the reporting facility AND all first course treatment or a decision not to treat was done at the reporting facility','Initial diagnosis elsewhere AND all or part of first course treatment was done at the reporting facility, NOS','Initial diagnosis elsewhere AND part of first course treatment was done at the reporting facility','Initial diagnosis elsewhere AND all first course treatment was done at the reporting facility','Initial diagnosis and all first course treatment elsewhere AND reporting facility participated in diagnostic workup (for example, consult only, staging workup after initial diagnosis elsewhere)','Diagnosis AND all first course treatment provided elsewhere AND patient presents at reporting facility with disease recurrence or persistence','Type of case not required by CoC to be accessioned (for example, a benign colon tumor) AND initial diagnosis AND part or all of first course treatment by reporting facility','Initial diagnosis established by autopsy at the reporting facility, cancer not suspected prior to death','Nonanalytic case of unknown relationship to facility (not for use by CoC accredited cancer programs for analytic cases).'],  placeholder: ' Select Class of Case' },
  //End of Class of Case
  ]
  apiResponse :NameTypeResponse[] = [];
  showSelectFields: boolean = false;
  minYear: number = 0;
  maxYear: number = 9999;
  totalCount: number = 0;


  raceValues = ['Asian', 'Hispanic', 'White', 'Black'];
  ageValues = ['10-20', '20-30', '30-40', '40-50'];
  showValues = false;

  public doughnutChartLabels: Label[] = ['Filtered', 'All'];
  public doughnutChartData: MultiDataSet = [
    [50, 100],
  ];
  //@ts-ignore
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[]=[
    {
      backgroundColor:["#FF7360","#6FC8CE"]
    }
  ];


  @Input() selectedCategory: any = '';

  constructor(
    private service: AttributeCategoriesService
  ) { }

  ngOnInit(): void {
    console.log(this.selectedCategory);
    this.getAttributeSubCategories();
    setInterval(() => {
      const dateChanged = localStorage.getItem('dateChanged');
      if (dateChanged === 'true') {
        this.updateDateRange();
        this.getAttributeSubCategories();
        // this.getTotalCancerCounts();
        localStorage.setItem('dateChanged', 'false');
      }
    }, 2000);
  }

  getAttributeSubCategories(){
    this.service.getAllNameTypes(this.minYear, this.maxYear).subscribe(
      (res: NameTypeResponse[]) => {
        this.apiResponse = res
        this.showSelectFields = true
        let mini = 99999999;
        res.forEach( (x) => mini = Math.min(x.count, mini));
        this.totalCount = mini
        this.updateDonut(3000, mini);
      },
      (error) => console.error(error)
    )
  }

  getTotalCancerCounts(){
    this.service.getTotalCount(this.minYear, this.maxYear).subscribe(
      (res) => {
        let mini = 99999999;
        console.log(this.apiResponse);
        this.apiResponse.forEach( (x) => mini = Math.min(x.count, mini));
        this.totalCount = mini
        this.updateDonut(3000, mini);
      },
      (error) => console.error(error)
    )
  }

  displaySelectedCategory(){
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      return JSON.parse(selectedCategory).name;
    }
    else{
      return null;
    }
  }

  
  displayDateRange() {
    return `Date Range : ${this.minYear} - ${this.maxYear}`;
  }

  updateDateRange() {
    const dateRange = localStorage.getItem('dateRange');
    if (dateRange) {
      const date = JSON.parse(dateRange);
      this.minYear = date.minValue;
      this.maxYear = date.maxValue;
    }
  }

  updateDonut(left: number, right: number) {
    this.doughnutChartData = [
      [left, right],
    ];
  }

}
