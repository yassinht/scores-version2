import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent {
  termsContent = `
    Pour me permettre d’élaborer un traitement le mieux approprié à vos symptômes, je vous remercie de répondre aux questionnaires suivants en cliquant sur le ou les boutons approprié(s). Ces questions portent sur certains symptômes pelviens. En répondant, prenez en compte les symptômes que vous avez ressentis. 
    Vous pouvez vous y opposer, à tout moment, sans autre forme de justification. Les informations recueillies sont strictement confidentielles. Elles feront l’objet, sauf opposition justifiée de votre part, d’un enregistrement informatique réservé à l’usage de votre professionnel de santé. 
    Votre professionnel de santé traitant se tient à votre disposition pour vous communiquer tout renseignement ainsi que toute information nécessaire à votre état de santé. Tout médecin, désigné par vous, peut également prendre connaissance de l’ensemble de votre dossier. 
    Aucune information ne sera diffusée à des tierces personnes (loi N° 78-17 du 06/01/1978 modifié).
  `;

  additionalTerms = `
    Je soussigné, déclare accepter librement et de façon éclairée de remplir les formulaires de scores et/ou des échelles d’autoévaluation, dans le cadre d’une consultation médicale (ou paramédicale) en rapport avec la (les) pathologie(s) pour laquelle (lesquelles) je consulte.
    Engagement du professionnel de Santé : en tant que praticien, il s’engage à faire remplir ces questionnaires selon les dispositions éthiques et déontologiques et à assurer la confidentialité des informations recueillies.
    Liberté du patient : le consentement peut être retiré à tout moment sans donner de raison et sans encourir aucune responsabilité ni conséquence. Les réponses aux questions ont un caractère facultatif, le défaut de réponse n’entraînant aucune conséquence pour le patient.
    Information du patient : le patient a la possibilité d’obtenir des informations supplémentaires concernant les questionnaires auprès du professionnel de Santé.
    Confidentialité des informations : toutes les informations concernant les patients seront conservées de façon anonyme et confidentielle.
    Déontologie et éthique : le professionnel de Santé s’engage à préserver absolument la confidentialité et le secret professionnel pour toutes les informations concernant le patient.
  `;
}
