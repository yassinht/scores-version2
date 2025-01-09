import { MessageService } from 'primeng/api';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { Options } from '@angular-slider/ngx-slider';
interface QuestionInfo {
  nextQuestion: string;
  sectionIndex: number;
  questionIndex: number;
  conditional: boolean;
  currentSection: number;
  currentQuestion: number;
}
@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
  providers: [MessageService],

})

export class FormPreviewComponent {
  sliders: { sectionIndex: number, questionIndex: number, slider: any }[] = [];


  section: any; // Assuming you have section defined
  sliderOptions: any[] = [];
  questions: string[] = [
    'Question 1',
    'Question 2',
    'Question 3',
    // Add more questions here as needed
  ];
  AA=0
  isChecked: boolean[] = new Array(this.questions.length).fill(false);

  Nomberdej:any
  textcourt:any
  questionStatus: { [key: string]: boolean } = {};
  questionInfoList: QuestionInfo[] = [];
  conditionalTab: string[] = []; // Define conditionalTab array to store indices
  isCheckedBySection: boolean[][] = [];
  answeredQuestions: string[] = [];
  unansweredQuestions: string[] = [];
  @Input() item = '';
  disabledConfirme = false;
  public showOverlay = false;
  valueRange: number = 0;
  test1: any;
  test2: any;
  test3: any;
  test4: any;
  test5: any;
  idForm: any;
  form: any;
  index: any;
  f: any;
  id: any;
  value: number = 100;
  idForm2: any;
  iddoctor: any;
  idpatient: any;
  FormScore = [];
  valD: any;
  tableCalcul = [];
  scoreF = 0;
  scoreS = '';
  tableReponse = [];
  numbers: number[] = [];
  tryNumber:any
  questionsStatus: { [key: string]: boolean } = {};
  isConfirmDisabled: boolean = true;

    /**
   * Handles slider options
   * @param slider - The slider
   * @returns Options for the slider
   */
    sliderMakeOptions(slider): Options {
      return {
        floor: 10,
        ceil: 100,
        step: 10,
        showTicks: true,
        stepsArray: slider.dataRange,

      };
    }
    
    getSliderValues(dataRange: any[]): number[] {
      console.log("dataRange:", dataRange); // Log the full dataRange array
      const values = dataRange.map((item) => item.value);
      console.log("Slider values:", values); // Log the extracted values
      return values;
    }
    
    getSliderStep(dataRange: any[]): number {
      if (dataRange.length < 2) {
        return 1; // Default step if only one value exists
      }
      return dataRange[1].value - dataRange[0].value; // Calculate step based on consecutive values
    }
    
    
  responses: any = {};
  
  constructor(
    // private data: FormDataService,
    private PatForms: FormsService,
    private router: ActivatedRoute,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService

  ) {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
    this.idForm2 = this.router.snapshot.paramMap.get('id');
    this.iddoctor = this.router.snapshot.paramMap.get('iddoctor');
    this.idpatient = this.router.snapshot.paramMap.get('idpatient');
    this.tryNumber = this.router.snapshot.paramMap.get('tryNumber');
    this.PatForms.getFormsById(this.idForm2).subscribe((response) => {
      this.form = response;
      console.log('formformformform?', this.form);
      console.log('all questionsssssss');

      this.getAllQuestions();

    });
    setTimeout(() => {
      const allQuestionsAnswered = this.areAllQuestionsAnswered();
    }, 3000); // 3000 milliseconds = 3 seconds
    
    }

  ngOnInit(): void {

    this.initializeQuestionsStatus();

    console.log(this.idForm2)
    for (var i = 0; i < 1; i++) {
      /*      console.log(i) */
    }
    /*   console.log(i) */
    this.FormScore = [];
    setTimeout(() => {}, 3000);
    this.initializeCheckboxes();

  }

  initializeQuestionsStatus() {
    this.form.sections.forEach((section, sIndex) => {
      section.questions.forEach((question, qIndex) => {
        if (question.type === 'Cases à cocher') {
          this.questionsStatus[`${sIndex}_${qIndex}`] = false;
        }
      });
    });
    this.updateConfirmButtonState();
  }

  onInputChange(sectionIndex: number, questionIndex: number) {
    this.questionsStatus[`${sectionIndex}_${questionIndex}`] = true;
    this.updateConfirmButtonState();
  }

  updateConfirmButtonState() {
    this.isConfirmDisabled = Object.values(this.questionsStatus).some(status => !status);
  }
  initializeCheckboxes(): void {
    // Initialize isCheckedBySection array for each section
    this.form.sections.forEach((section) => {
      this.isCheckedBySection[section.id] = new Array(section.questions.length).fill(false);
    });
  }
  pelviennes: any;



  getdataRangeBar(rep, data, q, o, event, s, slider) {
    // Check if the event value is undefined, indicating no user interaction
    if (event.value === undefined) {
      event.value = 0; // Set default value to 0
    }
  
    console.log(slider);
  
    // Find the corresponding object in tableReponse based on s and q
    const indexQ = this.tableReponse.findIndex((obj) => obj.id === s + '' + q);
  
    // If the object exists, update its score and scoreOptionRangeBar properties
    if (indexQ !== -1) {
      this.tableReponse[indexQ].score = event.value;
      this.tableReponse[indexQ].scoreOptionRangeBar = event.value;
  
      // Save slider in sliders table
      // ... (rest of logic for updating sliders table)
    } else {
      // If the object doesn't exist, create a new one and add it to tableReponse
      this.tableReponse.push({
        title: rep.title,
        type: rep.type,
        options: rep.options,
        textReponse: 'event',
        id: s + '' + q,
        optioncm: rep.optioncm,
        score: event.value,
        scoreOptionRangeBarQuestion: rep.dataRange,
        scoreOptionRangeBar: event.value,
        scoreOptioncm2: rep.grille,
        minRange: '0',
        optionsSaint: null
      });
  
      // Save slider in sliders table
      // ... (rest of logic for updating sliders table)
    }
  
    console.log(this.sliders);
  }

  
  getDataTextCourt(rep, event, s, q) {
    /*   console.log(rep,event.target.value,s,q)  */
    let indexQ = this.tableReponse.findIndex((x) => x.id === s + '' + q);
    if (indexQ === -1)
      this.tableReponse.push({
        title: rep.title,
        type: rep.type,
        optioncm: rep.optioncm,
        options: rep.options,
        textResponse: event.target.value,
        id: s + '' + q,
        score: 0,
        scoreOptionRangeBarQuestion: rep.dataRange,
        minRange: '0',
        optionsSaint: null,
      });
    else this.tableReponse[indexQ].textResponse = event.target.value;
  }

  tabGrille2 = [];
  tabGrille23 = {};
  tabH: {};
  tabV = [];



  Nomberdejours(value,event,sections,question,type){
    /*   console.log(event.target.value) */
     this.test1=value
     this.test2=event.target.value
     this.test3=sections
     this.test4=question
     this.test5=type
  
  
  
  
      let x =0
      if(this.FormScore.length===1&&this.FormScore[0]==0){
        this.FormScore= []
      }
      let  indexQ = this.FormScore.findIndex(x => 
        x.type===type
      );
      if( indexQ == -1){
        this.FormScore.push({text:event.target.value,score:Number(event.target.value),minRange:Number(event.target.value),index:x+1,section:sections,indexQuestion:question,type:type})
      }else{
        /* console.log(this.test1) */
        this.FormScore.map((result)=>{
        
          if(result.type==type){
            result.text=event.target.value
            result.score=Number(event.target.value)
            result.minRange=Number(event.target.value)
            result.section=value.sections
            result.indexQuestion=question
            result.type=type
          }
          
        })
     
      
      }
    }

  getdataNb(rep, data, q, o, event, s) {
    // console.log('rep,data,q,o', rep, data, q, o, event.target.value);
    let indexQ = this.tableReponse.findIndex((x) => x.id === s + '' + q);
    if (indexQ === -1)
      this.tableReponse.push({
        title: data.title,
        type: data.type,
        options: data.numberJourCmnt,
        textResponse: event.target.value,
        minRange:event.target.value,
        id: s + '' + q,
      });
    else this.tableReponse[indexQ].textResponse = event.target.value;
    /*  console.log(this.tableReponse,q,o,indexQ) */
  }

  getdataTextCour(rep, data, q, o, event, s) {
    // console.log('rep,data,q,o', rep, data, q, o, event.target.value);
    let indexQ = this.tableReponse.findIndex((x) => x.id === s + '' + q);
    if (indexQ === -1)
      this.tableReponse.push({
        title: data.title,
        type: data.type,
        options: data.numberJourCmnt,
        textResponse: event.target.value,
        id: s + '' + q,
      });
    else this.tableReponse[indexQ].textResponse = event.target.value;
    /*  console.log(this.tableReponse,q,o,indexQ) */
  }



  scorSend = [];
  TextCourt(value, event, sections, question, type) {
    this.test1 = value;
    this.test2 = event.target.value;
    this.test3 = sections;
    this.test4 = question;
    this.test5 = type;

    let x = 0;
    if (this.FormScore.length === 1 && this.FormScore[0] == 0) {
      this.FormScore = [];
    }
    let indexQ = this.FormScore.findIndex((x) => x.type === type);
    if (indexQ == -1) {
      this.FormScore.push({
        text: event.target.value,
        score: value,
        index: x + 1,
        section: sections,
        indexQuestion: question,
        type: type,
      });
    } else {
      this.FormScore.map((result) => {
        if (result.type == type) {
          result.text = event.target.value;
          result.score = this.test1;
          result.section = value.sections;
          result.indexQuestion = question;
          result.type = type;
        }
      });
    }
    
  }


  combinedcheckbox(value, event, sections, question, type, data, q, o, s) {
    console.log('combinedcheckbox called with:', value, event, sections, question, type, data, q, o, s);
    
    if (event.checked) {
      let x = 0;
      if (this.FormScore.length === 1 && this.FormScore[0] == 0) {
        this.FormScore = [];
      }
  
      let index = this.FormScore.findIndex((x) => x.text === value.text);
      let indexQ = this.FormScore.findIndex((x) => x.type === type);
  
      if (event.checked && indexQ == -1) {
        this.FormScore.push({
          text: value.text,
          score: value.score,
          index: x + 1,
          section: sections,
          indexQuestion: question,
          type: type,
        });
      } else {
        this.FormScore[indexQ].score = Number(this.FormScore[indexQ].score) + Number(value.score);
      }
  
      let indexQ2 = this.tableReponse.findIndex((x) => x.id === s + '' + q);
      data.optioncm[o].selected = event.checked;
  
      if (indexQ2 === -1) {
        this.tableReponse.push({
          title: data.title,
          type: data.type,
          options: data.optioncm,
          textResponse: '',
          id: s + '' + q,
          optioncm: data.optioncm,
          score: 0,
          scoreOptionRangeBarQuestion: data.dataRange,
          scoreOptionRangeBar: 0,
          scoreOptioncm2: data.grille,
          minRange: '0',
          optionsSaint: null,
        });
      } else {
        this.tableReponse[indexQ2].options = data.optioncm;
      }
    } else {
      let x = 0;
      if (this.FormScore.length === 1 && this.FormScore[0] == 0) {
        this.FormScore = [];
      }
  
      let index = this.FormScore.findIndex((x) => x.text === value.text);
      let indexQ = this.FormScore.findIndex((x) => x.type === type);
  
      if (indexQ != -1) {
        this.FormScore[indexQ].score = Number(this.FormScore[indexQ].score) - Number(value.score);
      }
    }
  
    console.log('Selected state of option:', data.optioncm[o].selected);
    console.log('Optioncm array for question:', data.optioncm);
  
    // Ensure question status is updated
    this.updateQuestionStatus(s, q);
  }


  combinedVisuelle(rep, type, q, o, event, s, e, a, b, visuelleanalogique) {
  

    let indexQ = this.tableReponse.findIndex((x) => x.id === s + '' + q);
    if (indexQ === -1) {
      this.tableReponse.push({
        title: rep.title,
        type: rep.type,
        options: rep.options,
        textResponse: 'event.target.value',
        id: s + '' + q,
        optioncm: rep.optioncm,
        score: Number(event.target.value),
        scoreOptionRangeBarQuestion: rep.dataRange,
        scoreOptionRangeBar: 0,
        scoreOptioncm2: rep.grille,
        minRange: '0',
        optionsSaint: null,
      });
    } else {
      this.tableReponse[indexQ].textResponse = event.target.value;
      this.tableReponse[indexQ].score = event.target.value;
    }


    let x = 0;
    if (this.FormScore.length === 1 && this.FormScore[0] == 0) {
      this.FormScore = [];
    }
    let indexQFormScore = this.FormScore.findIndex((x) => x.type === b);
    if (indexQFormScore == -1) {
      this.FormScore.push({
        text: visuelleanalogique,
        score: e.target.value,
        index: x + 1,
        section: a,
        indexQuestion: a,
        type: b,
      });
    } else {
      this.FormScore.map((result) => {
        if (result.type === b) {
          result.score = e.target.value;
        }
      });
    }
    this.updateQuestionStatus(s, q);

  }


  GrilleCases(
    quesOptions,
    l,
    c,
    s,
    q,
    questionObj,
    value,
    event,
    sections,
    question,
    type
  ) {
    let table2 = [];

    let indexQ = this.tableReponse.findIndex((x) => x.id === s + '' + q);

    if (indexQ === -1) {
      for (let row = 0; row < quesOptions.options.length; row++) {
        let tableRow = [];
        for (let cell = 0; cell < quesOptions.scoreS.length; cell++) {
          tableRow.push(false);
        }
        table2.push(tableRow);
      }

      table2[l][c] = true;

      let scoreOptioncm2 = {
        questions: questionObj.grille.options,
        table: table2,
        grille: questionObj.grille.scoreS,
      };

      this.tableReponse.push({
        title: questionObj.title,
        type: questionObj.type,
        options: questionObj.options.map((option) => ({
          text: option.text,
          score: option.score,
          textecourt: 'false',
          selected: false,
        })),
        textResponse: '0',
        id: s + '' + q,
        optioncm: questionObj.optioncm.map((option) => ({
          text: option.text,
          score: option.score,
          textecourt: 'false',
          selected: false,
        })),
        score: 0,
        scoreOptionRangeBarQuestion: [{ value: 0, legend: '', nameRange: '' }],
        scoreOptionRangeBar: 0,
        scoreOptioncm2: scoreOptioncm2,
        minRange: '0',
        optionsSaint: null,
      });
    } else {
      for (
        let p = 0;
        p < this.tableReponse[indexQ].scoreOptioncm2.table[l].length;
        p++
      ) {
        this.tableReponse[indexQ].scoreOptioncm2.table[l][p] = p === c;
      }
    }

    let indexFormScore = this.FormScore.findIndex((x) => x.type === type);

    if (this.FormScore.length === 1 && this.FormScore[0] === 0) {
      this.FormScore = [];
    }

    const calculateTotalScore = () => {
      let totalScore = 0;
      this.FormScore[indexFormScore].indexQuestion.forEach((res) => {
        totalScore += res.score;
      });
      return totalScore;
    };

    if (indexFormScore === -1) {
      let tab = [{ question: question, score: Number(event.score) }];
      this.FormScore.push({
        text: value.text ,
        score: event.score,
        index: 1,
        section: sections,
        indexQuestion: tab,
        type: type,
      });
    } else {
      let indexF = this.FormScore[indexFormScore].indexQuestion.findIndex(
        (x) => x.question === question
      );

      if (indexF !== -1) {
        this.FormScore[indexFormScore].indexQuestion[indexF].score = Number(
          event.score
        );
      } else {
        this.FormScore[indexFormScore].indexQuestion.push({
          question: question,
          score: Number(event.score),
        });
      }

      this.FormScore[indexFormScore].score = calculateTotalScore();
    }
    // console.log(this.tableReponse)
    // console.log(this.FormScore)
    this.updateQuestionStatus(s, q);


  }
  GrilleCasesRemplited(grille: any, rowIndex: number, colIndex: number, sectionIndex: number, questionIndex: number, question: any, score: number, option: any, s: number, questionKey: string) {
    question.grille.options[rowIndex].selected = colIndex; // Store the selected column for each row
    // Check if all rows are filled
    const allRowsFilled = question.grille.options.every((row: any) => row.selected !== undefined);
  
    if (allRowsFilled) {
      this.questionStatus[questionKey] = true;
    } else {
      this.questionStatus[questionKey] = false;
    }
  
    console.log(`Updated status of ${questionKey} to ${this.questionStatus[questionKey]}`);
    this.areAllQuestionsAnswered(); // Update the tables when a question is answered
  }
  
  combinedCasesCocher(
    value,
    event,
    sections,
    question,
    type,
    rep,
    data,
    q,
    o,
    s,
  ) {
    // Handle the caseCoher logic
    let x = 0;

    // Check if the FormScore array has only one element with a value of 0 and reset it if true
    if (this.FormScore.length === 1 && this.FormScore[0] == 0) {
      this.FormScore = [];
    }

    // Find the index of an existing entry in FormScore with the same 'type'
    let indexQ = this.FormScore.findIndex((x) => x.type === type);

    // If no entry with the same 'type' exists, push a new entry into FormScore
    if (indexQ == -1) {
      this.FormScore.push({
        text: value.text,
        score: value.score,
        index: x + 1,
        section: sections,
        indexQuestion: question,
        type: type,
      });
    } else {
      // Update an existing entry in FormScore with the same 'type'
      this.FormScore.map((result) => {
        if (result.type == type) {
          result.text = value.text;
          result.score = value.score;
          result.section = value.sections;
          result.indexQuestion = question;
          result.type = type;
        }
      });
    }

    // Handle the getdataCaseCoher logic

    // Find the index of an existing entry in tableReponse with the same 'id'
    let indexQGetData = this.tableReponse.findIndex((x) => x.id === s + '' + q);

    // Update the 'selected' property of options in the 'data' object
    data.options.map((res) => {
      if (res != rep) {
        res.selected = false;
      } else {
        res.selected = true;
      }
    });

    // If no entry with the same 'id' exists, push a new entry into tableReponse
    if (indexQGetData === -1) {
      this.tableReponse.push({
        title: data.title,
        type: data.type,
        options: data.options,
        textResponse: '',
        id: s + '' + q,
        optioncm: data.optioncm,
        score: 0,
        scoreOptionRangeBarQuestion: data.dataRange,
        scoreOptionRangeBar: 0,
        scoreOptioncm2: data.grille,
        minRange: '0',
        optionsSaint: null,
      });
    } else {
      // Update an existing entry in tableReponse with the same 'id'
      this.tableReponse[indexQGetData].options = data.options;
    }
  }

  combinedRange(
    value,
    score,
    sections,
    question,
    type,
    data,
    rep,
    q,
    o,
    event,
    s
  ) {
    if (this.FormScore.length === 1 && this.FormScore[0] === 0) {
      this.FormScore = [];
    }

    let indexQ = this.FormScore.findIndex((x) => x.type === type);

    if (indexQ === -1) {
      this.FormScore.push({
        score: event.value,
        index: 0,
        section: sections,
        indexQuestion: question,
        type: type,
      });
    } else {
      this.FormScore.map((result) => {
        if (result.type === type) {
          result.score = score;
          result.section = value.sections;
          result.indexQuestion = question;
          result.type = type;
        }
      });
    }

    let indexQGetData = this.tableReponse.findIndex((x) => x.id === s + '' + q);

    if (indexQGetData === -1) {
      this.tableReponse.push({
        title: rep.title,
        type: rep.type,
        options: rep.options,
        textResponse: event.value,
        id: s + '' + q,
        optioncm: rep.optioncm,
        score: event.value,
        scoreOptionRangeBarQuestion: rep.dataRange,
        scoreOptionRangeBar: 0,
        scoreOptioncm2: rep.grille,
        minRange: '0',
        optionsSaint: null,
      });
    } else {
      this.tableReponse[indexQGetData].score = event.value;
    }
    this.updateQuestionStatus(s, q);

  }
  calcul() {
    console.log("in calcul");
  
    // Check if all questions are answered, including conditional questions (locked ones treated as answered)
    if (!this.areAllQuestionsAnswered()) {
      console.log("not all answered");
  
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: this.getErrorMessage(),
      });
      return;
    }
  
    // Disable confirm button and show overlay
    this.disabledConfirme = true;
    this.showOverlay = true;
  
    // Get all questions from the form
    let allQuestions = this.getAllQuestions();
    console.log(allQuestions);
  
    // Ensure responses maintain original order and format
    this.tableReponse = allQuestions.map((question) => {
      // Find existing response for the current question
      const existingResponse = this.tableReponse.find(r => r.id === question.id);
      // Return existing response or create a new one with default values
      return existingResponse ? existingResponse : {
        title: question.title,
        type: question.type,
        options: question.options,
        textResponse: question.textResponse || "",
        id: question.id,
        optioncm: question.optioncm,
        score: question.score,
        scoreOptionRangeBarQuestion: question.scoreOptionRangeBarQuestion,
        scoreOptionRangeBar: question.scoreOptionRangeBar,
        scoreOptioncm2: question.scoreOptioncm2,
        minRange: question.minRange ? String(question.minRange) : "", // Convert minRange to string
        optionsSaint: question.optionsSaint
      };
    });
  
    console.log(this.tableReponse);
  
    // Submit form responses after a delay
    setTimeout(() => {
      this.PatForms.addRep({
        form: this.idForm2,
        user: this.idpatient,
        doctor: this.iddoctor,
        responses: this.tableReponse,
        score: this.scorSend,
      }).subscribe((res) => {
        if (res) {
          // Display success message and navigate to contacts page
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Success',
            detail: this.getSuccessMessage(),
          });
        }
      });
    }, 4000);
  
    // Optionally reload the page after a delay (commented out)
    setTimeout(() => {
      // location.reload()
    }, 12000);
  }
  




  
  
    
  handleConditionalCasesCocher(option: any, sectionIndex: number, questionIndex: number) {
    console.log("Handling conditional cases for option:", option.text);
  
    const currentSection = this.form.sections[sectionIndex];
    const currentQuestion = currentSection.questions[questionIndex];
  
    if (currentQuestion && currentQuestion.options && Array.isArray(currentQuestion.options)) {
      currentQuestion.options.forEach((opt: any) => {
        if (opt === option) {
          if (opt.unlockedQuestions !== null && Array.isArray(opt.unlockedQuestions)) {
            // Unlocking the questions based on selected option
            opt.unlockedQuestions.forEach((unlock: any) => {
              const unlockSection = this.form.sections[unlock.sectionIndex];
              if (unlockSection) {
                const unlockQuestion = unlockSection.questions[unlock.questionIndex];
                console.log("unlockSection", unlockSection);
                console.log("unlockQuestion", unlockQuestion);
  
                if (unlockQuestion) {
                  unlockQuestion.conditional = false;  // Unlock the question
  
                  // Add unlocked question to unansweredQuestions if it's not already answered
                  const unlockQuestionKey = `Q(${unlock.sectionIndex},${unlock.questionIndex})`;
                  if (!this.unansweredQuestions.includes(unlockQuestionKey)) {
                    this.unansweredQuestions.push(unlockQuestionKey);
                  }
  
                  // Ensure the question is correctly tracked in areAllQuestionsAnswered
                  this.areAllQuestionsAnswered(unlock.sectionIndex, unlock.questionIndex);
                }
              }
            });
          }
  
          // Locking other questions if necessary (when another option is selected)
          currentQuestion.options.forEach((otherOpt: any) => {
            if (otherOpt !== opt) {
              if (otherOpt.unlockedQuestions !== null && Array.isArray(otherOpt.unlockedQuestions)) {
                otherOpt.unlockedQuestions.forEach((unlock: any) => {
                  const unlockSection = this.form.sections[unlock.sectionIndex];
                  if (unlockSection) {
                    const unlockQuestion = unlockSection.questions[unlock.questionIndex];
  
                    if (unlockQuestion) {
                      // Lock the question if it shouldn't be unlocked by the current option
                      if (!this.isQuestionUnlockedByCurrentOption(option, unlock.sectionIndex, unlock.questionIndex)) {
                        unlockQuestion.conditional = true;  // Lock the question
                        this.lockOptionQuestions(unlockQuestion.options);
                        this.resetQuestion(unlock.sectionIndex, unlock.questionIndex);
                        this.addToConditionalTab(unlock.sectionIndex, unlock.questionIndex);
                      }
                    }
                  }
                });
              }
            }
          });
        } else {
          // Handle case when the option is not selected (it should still be added to the conditional tab if necessary)
          if (opt.unlockedQuestions !== null && Array.isArray(opt.unlockedQuestions)) {
            opt.unlockedQuestions.forEach((unlock: any) => {
              const unlockSection = this.form.sections[unlock.sectionIndex];
              if (unlockSection) {
                const unlockQuestion = unlockSection.questions[unlock.questionIndex];
                if (unlockQuestion) {
                  this.addToConditionalTab(unlock.sectionIndex, unlock.questionIndex);
                }
              }
            });
          }
        }
      });
    } else {
      console.error("Current question or options are undefined.");
    }
  }





    handleConditionalMultichoix(option: any, sectionIndex: number, questionIndex: number) {
      console.log("Handling conditional cases for option:", option.text);
    
      const currentSection = this.form.sections[sectionIndex];
      const currentQuestion = currentSection.questions[questionIndex];
    
      if (currentQuestion && currentQuestion.optioncm && Array.isArray(currentQuestion.optioncm)) {
        // Handle case when the option is selected
        if (option.selected) {
          if (option.unlockedQuestions && Array.isArray(option.unlockedQuestions)) {
            option.unlockedQuestions.forEach((unlock: any) => {
              const unlockSection = this.form.sections[unlock.sectionIndex];
              if (unlockSection) {
                const unlockQuestion = unlockSection.questions[unlock.questionIndex];
                if (unlockQuestion) {
                  console.log("Unlocking conditional question:", unlockQuestion.text);
                  unlockQuestion.conditional = false; // Enable the question
                }
              }
            });
          }
        } else {
          // Handle case when the option is deselected
          if (option.unlockedQuestions && Array.isArray(option.unlockedQuestions)) {
            option.unlockedQuestions.forEach((unlock: any) => {
              const unlockSection = this.form.sections[unlock.sectionIndex];
              if (unlockSection) {
                const unlockQuestion = unlockSection.questions[unlock.questionIndex];
                if (unlockQuestion) {
                  // Check if other options are still unlocking this question
                  const stillUnlocked = currentQuestion.optioncm.some((opt: any) => 
                    opt.selected && 
                    opt.unlockedQuestions?.some((u: any) => u.sectionIndex === unlock.sectionIndex && u.questionIndex === unlock.questionIndex)
                  );
    
                  if (!stillUnlocked) {
                    console.log("Locking conditional question due to unchecked option:", unlockQuestion.text);
                    unlockQuestion.conditional = true; // Disable the question
                    this.lockOptionQuestions(unlockQuestion.optioncm); // Lock any nested options
                    this.resetQuestion(unlock.sectionIndex, unlock.questionIndex); // Reset the question
                    this.addToConditionalTab(unlock.sectionIndex, unlock.questionIndex); // Add to conditional tab
                  }
                }
              }
            });
          }
        }
      } else {
        console.error("Current question or optioncm are undefined.");
      }
    }
    
    
    
    
    
    
    
    
    
    
    
    



    isQuestionUnlockedByCurrentOption(option: any, sectionIndex: number, questionIndex: number): boolean {
      if (option.unlockedQuestions && Array.isArray(option.unlockedQuestions)) {
        return option.unlockedQuestions.some((unlock: any) => 
          unlock.sectionIndex === sectionIndex && unlock.questionIndex === questionIndex
        );
      }
      return false;
    }
    
    lockOptionQuestions(option: any) {
      console.log('option', option);
    
      if (Array.isArray(option)) {
        option.forEach(op => {
          if (op.unlockedQuestions && op.unlockedQuestions.length > 0) {
            op.unlockedQuestions.forEach((unlock: any) => {
              this.lockNestedQuestions(unlock.sectionIndex, unlock.questionIndex);
              // console.log("unlock.sectionIndex, unlock.questionIndex***********");
              // console.log(unlock.sectionIndex, unlock.questionIndex);
              this.lockNestedQuestions(unlock.sectionIndex, unlock.questionIndex)
            });
          } else {
            console.log("No nested questions to lock for this option.");
          }
        });
      } else {
        console.log("Option array is not defined or not an array.");
      }
    }
    
    lockNestedQuestions(sectionIndex: number, questionIndex: number) {
      const section = this.form.sections[sectionIndex];
      if (section) {
        const question = section.questions[questionIndex];
        if (question) {
          // console.log("Locking question:", question.text);
          question.conditional = true;
          this.resetQuestion(sectionIndex, questionIndex);
          this.addToConditionalTab(sectionIndex, questionIndex);
    
          if (question.options && Array.isArray(question.options)) {
            question.options.forEach((option: any) => {
              this.lockOptionQuestions(option);
            });
          }
        }
      }
    }
    
    // Function to add index to conditionalTab
    addToConditionalTab(sectionIndex: number, questionIndex: number) {
      const indexString = `${sectionIndex}${questionIndex}`;
      if (!this.conditionalTab.includes(indexString)) {
        this.conditionalTab.push(indexString);
      }
      // console.log("conditionalTab");
    
      // console.log(this.conditionalTab);
    }
    
    areAllQuestionsAnswered(sectionIndex?: number, questionIndex?: number): boolean {
      this.answeredQuestions = [];
      this.unansweredQuestions = [];
    
      console.log('Checking if all questions are answered...');
      if (this.form) {
        for (let secIndex = 0; secIndex < this.form.sections.length; secIndex++) {
          for (let quesIndex = 0; quesIndex < this.form.sections[secIndex].questions.length; quesIndex++) {
            const questionKey = `Q(${secIndex},${quesIndex})`;
            const question = this.form.sections[secIndex].questions[quesIndex];
    
            // If the question is conditional, treat it as answered immediately until it is unlocked
            if (question.conditional === true) {
              // Mark the question as answered until it's unlocked
              if (!this.answeredQuestions.includes(questionKey)) {
                this.answeredQuestions.push(questionKey);  // Add to answered if conditional
              }
            } else {
              // Otherwise check for question types
              if (question.type === 'Grille de cases à cocher 2') {
                const allRowsFilled = question.grille.options.every((row: any) => row.selected !== undefined);
                this.questionStatus[questionKey] = allRowsFilled;
              } else if (question.type === 'Choix multiples') {
                const anyOptionSelected = question.optioncm.some((option: any) => option.selected);
                this.questionStatus[questionKey] = anyOptionSelected;
              }
    
              // If the question is answered, add it to answeredQuestions
              if (this.questionStatus[questionKey]) {
                if (!this.answeredQuestions.includes(questionKey)) {
                  this.answeredQuestions.push(questionKey);
                }
              } else {
                // If not answered, add it to unansweredQuestions
                if (!this.unansweredQuestions.includes(questionKey)) {
                  this.unansweredQuestions.push(questionKey);
                }
              }
            }
    
            // Handle specific section and question when tracking a question's status
            if (sectionIndex !== undefined && questionIndex !== undefined && sectionIndex === secIndex && questionIndex === quesIndex) {
              const questionKey = `Q(${sectionIndex},${questionIndex})`;
              if (!this.unansweredQuestions.includes(questionKey)) {
                this.unansweredQuestions.push(questionKey);
              }
            }
          }
        }
    
        // Return true if all questions are answered
        if (this.unansweredQuestions.length === 0) {
          console.log('Success: All questions are answered.');
          return true;
        } else {
          return false;
        }
      }
    
      console.log('Form is not defined.');
      return false;
    }
  
    
  updateQuestionStatus(sectionIndex: number, questionIndex: number) {
      const questionKey = `Q(${sectionIndex},${questionIndex})`;
      this.questionStatus[questionKey] = true;
      console.log(`Updated status of ${questionKey} to true`);
      this.areAllQuestionsAnswered(); // Update the tables when a question is answered
  }
  
  // displayNotification(message: string) {
  //   const config = new MatSnackBarConfig();
  //   config.verticalPosition = 'top';
  //   config.horizontalPosition = 'right';
  //   config.duration = 3000; 
  
  //   this.snackBar.open(message, 'Close', config);
  // }
  
  
  getAllQuestions() {
    let allQuestions = [];
  
    if (this.form && this.form.sections) {
      this.form.sections.forEach((section, s) => {
        if (section.questions) {
          section.questions.forEach((question, q) => {
            // console.log('here scoreOptionRangeBarQuestion')
            // console.log(question)
            allQuestions.push({
              "title": question.title,
              "type": question.type,
              "options": question.options,
              "textResponse": question.textResponse || "",
              "id": `${s}${q}`,
              "optioncm": question.optioncm,
              "score": question.score,
              "scoreOptionRangeBarQuestion": question.dataRange,
              "scoreOptionRangeBar": question.scoreOptionRangeBar,
              "scoreOptioncm2": question.scoreOptioncm2,
              "minRange": question.minRange,
              "optionsSaint": question.optionsSaint,
              "dataRange": question.dataRange // Added dataRange field
            });
          });
        }
      });
    }
  
    // console.log('All Questions:', allQuestions);
    return allQuestions;
  }
  
    
    resetCheckboxes(sectionIndex: number, questionIndex: number) {
      const question = this.form.sections[sectionIndex].questions[questionIndex];
      question.options.forEach(option => option.checked = false);
    }
    
    resetQuestion(sectionIndex, questionIndex) {
      console.log("here reset");
      console.log(sectionIndex);
      console.log(questionIndex);
    
      const section = this.form.sections[sectionIndex];
    
      if (section && section.questions && section.questions.length > questionIndex) {
        const question = section.questions[questionIndex];
    
        // Reset the question based on its type
        switch (question.type) {
          case 'Text court':
            console.log(`Resetting question ${sectionIndex}, ${questionIndex}: Text court`);
            question.data = '';
            break;
          case 'Nomber de jours':
            console.log(`Resetting question ${sectionIndex}, ${questionIndex}: Nomber de jours`);
            question.data = 0;
            break;
          case 'Choix multiples':
            this.resetCheckboxValues(sectionIndex, questionIndex);
            break;
          case 'Range Bar':
            this.getSliderObject(sectionIndex, questionIndex);
            break;
          case 'VISUELLE ANALOGIQUE':
            console.log(`Resetting question ${sectionIndex}, ${questionIndex}: VISUELLE ANALOGIQUE`);
            question.data = 5; // Set to default value
            break;
          case 'Cases à cocher':
            console.log(`Resetting question ${sectionIndex}, ${questionIndex}: Cases à cocher`);
            this.resetCasesCocher(sectionIndex, questionIndex);
            this.resetCasesCocher(sectionIndex, questionIndex);

            break;
          case 'Grille de cases à cocher 2':
            console.log(`Resetting question ${sectionIndex}, ${questionIndex}: Grille de cases à cocher 2`);
            question.grille.options.forEach(option => {
              option.scoreS.forEach(score => {
                score.checked = false;
              });
            });
            break;
          default:
            break;
        }
    
        // Ensure the reset question is included in tableReponse with default values
        const responseIndex = this.tableReponse.findIndex(response => response.id === `${sectionIndex}${questionIndex}`);
        const defaultResponse = {
          title: question.title,
          type: question.type,
          options: question.options || [],
          textResponse: question.textResponse || "",
          id: `${sectionIndex}${questionIndex}`,
          optioncm: question.optioncm || [],
          score: question.score || null,
          scoreOptionRangeBarQuestion: question.dataRange || null,
          scoreOptionRangeBar: question.scoreOptionRangeBar || null,
          scoreOptioncm2: question.scoreOptioncm2 || null,
          minRange: question.minRange ? String(question.minRange) : "", // Convert minRange to string
          optionsSaint: question.optionsSaint || []
        };
    
        if (responseIndex === -1) {
          this.tableReponse.push(defaultResponse);
        } else {
          this.tableReponse[responseIndex] = defaultResponse;
        }
      } else {
        console.error(`Section or question is undefined for indices ${sectionIndex}, ${questionIndex}`);
      }
    }
    
  
  getSliderObject(s, q) {
    let lockedSlider = this.sliders.find(slider => slider.sectionIndex === s && slider.questionIndex === q);
    if (lockedSlider) {
      this.moveToFirstStep(lockedSlider.slider);
      this.sliders = this.sliders.filter(slider => slider !== lockedSlider);
    }
  }
  
  moveToFirstStep(slider): void {
    console.log(slider)
    slider.value = slider.options.floor;
  }
    
    
    
    resetOptions(options: any[]) {
      options.forEach((option: any) => {
        option.checked = false;
      });
    }
    
 
    resetCheckboxValues(s, q) {
      console.log('resetCheckboxValues');
      const currentQuestion = this.form.sections[s].questions[q];
      if (currentQuestion.type === 'Choix multiples') {
        currentQuestion.optioncm = currentQuestion.optioncm.map(option => ({ ...option, selected: false }));
        
        const responseIndex = this.tableReponse.findIndex(response => response.id === `${s}${q}`);
        if (responseIndex !== -1) {
          this.tableReponse[responseIndex].optioncm = this.tableReponse[responseIndex].optioncm.map(option => ({ ...option, selected: false }));
        }
      }
    
      // Trigger Angular's change detection
      this.cdr.detectChanges();
    }
  resetCasesCocher(s, q) {
    // console.log("resetCasesCocher");
    // console.log(s, q);
    const currentQuestion = this.form.sections[s].questions[q];
    if (currentQuestion.type === 'Cases à cocher') {
        // console.log(currentQuestion.type);

        // Create a new array with unchecked options
        currentQuestion.options = currentQuestion.options.map(option => ({ ...option, selected: false }));
console.log(currentQuestion.options)
        // Reset the values in tableReponse as well
        const responseIndex = this.tableReponse.findIndex(response => response.id === `${s}${q}`);
        if (responseIndex !== -1) {
            this.tableReponse[responseIndex].options = this.tableReponse[responseIndex].options.map(option => ({ ...option, selected: false }));
        }
        this.cdr.detectChanges();

    }
}
    



getSuccessMessage(): string {
  return localStorage.getItem('langauage') === 'fr'
    ? 'Formulaire rempli avec succès'
    : 'Form filled successfully';
}

getErrorMessage(): string {
  return localStorage.getItem('langauage') === 'fr'
    ? 'Toutes les questions doivent être remplies'
    : 'All questions should be filled';
}



}