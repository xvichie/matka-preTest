import React from 'react'
import './TermsAndConditionsScreen.scss';
import AdPlaceholderComponent from '../../components/AdPlaceholderComponent/AdPlaceholderComponent';

function TermsAndConditionsScreen() {
  return (
    <div className='TermsAndConditionsScreen'>
        <div className="TermsAndConditions-Wrapper">
            <AdPlaceholderComponent AdId={10}></AdPlaceholderComponent>
            <div className="TAC-Label">
                <h1>წესები და პირობები</h1>
            </div>
            <div className="TAC-Content">
                <ul>
                    <li>
                        <h4>საიტზე (Matka.ge) რეგისტრაციით მომხმარებელი ადასტურებს, რომ გაეცნო და ეთანხმება პორტალით სარგებლობის წესებსა და პირობებს;</h4>
                    </li>
                    <li>
                        <h4>მომხმარებელი პასუხისმგებელია ნებისმიერ ქმედებაზე, რომელიც განხორციელებულია პორტალზე მისი სახელით;</h4>
                    </li>
                    <li>
                        <h4>მომხმარებელი პასუხისმგებელია საკუთარი სარეგისტრაციო მონაცემების(ელ. ფოსტა, პაროლი და სხვა ნებისმიერი სარეგისტრაციო მონაცემი) უსაფრთხოდ შენახვაზე;</h4>
                    </li>
                    <li>
                        <h4>სერვისის ზოგიერთი ნაწილის ფუნქციონალური შესაძლებლობების 
                            გამოყენება შესაძლებელია მხოლოდ მომხმარებლის მიერ რეგისტრაციის გავლის შემდეგ.</h4>
                    </li>
                    <li>
                        <h4>
                            მომხმარებლის მიერ არჩეული ლოგინი და პაროლი აუცილებელი და საკმარისი პირობაა წინა 
                            პუნქტში ხსენებული სერვისის შესაძლებლობების გამოყენებისათვის.
                        </h4>
                    </li>
                    <li>
                        <h4>
                            ადმინისტრაცია უფლებას იტოვებს არ მისცეს მომხმარებელს გარკვეული ლოგინების გამოყენების უფლება,
                            ასევე დააწესოს შეზღუდვები ლოგინისა და პაროლის სიმბოლოების რაოდენობაზე და ა.შ.
                        </h4>
                    </li>
                    <li>
                        <h4>
                            მომხმარებელი თვითონაა პასუხისმგებელი თავისი ლოგინისა და პაროლის უსაფრთხოებაზე (ადვილად ამოცნობადობაზე).
                            ასევე დამოუკიდებლად უზრუნველყოფს მათ კონფიდენციალურობას.
                        </h4>
                    </li>
                    <li>
                        <h4>
                            მომხმარებელი პასუხს აგებს მის მიერ პორტალზე განთავსებულ ინფორმაციაზე;
                        </h4>
                    </li>
                    <li>
                        <h4>
                            პორტალის ადმინისტრაცია უფლებამოსილია, ცალმხრივად, მომხმარებლის წინასწარი შეტყობინების გარეშე, შეიტანოს ცვლილებები და დამატებები პირობებში;
                        </h4>
                    </li>
                    <li>
                        <h4>
                            ცვლილებები და დამატებები გამოქვეყნდება პირობებში. მომხმარებლის მიერ პორტალის შემდგომი გამოყენება ჩაითვლება თანხმობად ცვლილებებსა და დამატებებზე;
                        </h4>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default TermsAndConditionsScreen