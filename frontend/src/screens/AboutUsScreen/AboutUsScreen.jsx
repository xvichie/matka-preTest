import React from 'react'
import './AboutUsScreen.scss';
import { Link } from 'react-router-dom';

function AboutUsScreen() {
  return (
    <div className='AboutUsScreen'>
      <div className="AboutUsScreen-Wrapper">
        <div className="AboutUs-Labels">
          <h1>ჩვენს შესახებ</h1>
        </div>
        <div className="AboutUs-AboutMain">
            <h3>ბავშვებისგან, სხვა ბავშვებისთვის</h3>
            <h6>
                Matka.ge არის მათემატიკის ონლაინ ინტერაქტიული პლატფორმა, რომელიც მიზნად ისახავს, რომ აბიტურიენტებს ან ნებისმიერ ახალგაზრდას, რომელსაც მათემატიკის ეროვნული გამოცდის დაწერა უწევს,
                მათემატიკის სწავლის პროცესი და ტესტისთვის მომზადება გაუადვილოს. როგორც მოგეხსენებათ, ხშირად ბავშვებზე არის ძალიან დიდი სტრესი აბიტურიენტობის დროს,
                მათ ეუბნებიან ისეთ რაღაცეებს, როგორიცაა: "ეს წელი შენთვის ყველაზე მნიშვნელოვანია", "ეს წელი განსაზღვრავს შენ მომავალს,წარმატებას და ბედნიერებას", "მიდი, გამოცდები კარგად უნდა
                დაწერო, თორემ სახლიდან გაგაგდებ" და ა.შ., რაც ახალგაზრდებზე განსაკუთრებულად ზრდის სტრესს. თუ უკვე ის არ იყო საკმარისი, რომ ტესტი გაქვს დასაწერი, ახლა მშობლებისგან და
                ახლობლებისგანაც გიწევს, რომ აიტანო დღე და ღამე ეროვნულ გამოცდებზე საუბარი.
            </h6>
            <h3>აბიტურიენტი საქართველოში</h3>
            <h6>
              თუმცა, ყველაზე დიდი პრობლემა, მაინც ის არის, რომ, მასალა, რომელსაც განათლების სამინისტრო ბავშვებს სთხოვს მათემატიკაში, სკოლების 99.9% ში ბოლომდე არ ისწავლება. ხშირად ჩვენი
              სკოლები შემოიფარგლებიან ზედაპირული, მცირე, მოსაწყენი და მოძველებული სწავლის მეთოდებით, რაც ბავშვის სწავლის უნარიანობას ბოლომდე კლავს. სწორედ ამიტომაც, მშობლებს აღარ რჩებათ
              სხვა გამოსავალი, გარდა იმისა, რომ თავიანთი შვილები, ატარონ კვირაში 3-ჯერ დამატებით რეპეტიტორებთან. ამით, ისედაც მენტალურად და ფიზიკურად გადაღლილ ბავშვს, კიდევ უფრო ვღლით
              და ვაზიზღებთ სკოლის მეთორმეტე წელს. თუმცა, შეიძლება ითქვას, რომ ამაზე უფრო დიდი პრობლემა ის არის, რომ, განათლებაში, რომელიც კანონის მიხედვით უფასოდ უნდა გეკუთვნოდეს, შენს
              მშობელს უწევს გადაიხადოს საკმაოდ დიდი თანხა. ხშირად, ნორმალური და გამოცდილი მასწავლებლის ფასები $800-$1000 წელიწადში მერყეობს, რაც ერთი შეხედვით შეიძლება ძვირი არ ჩანდეს, ისეთი მნიშვნელოვანი
              რაღაცისთვის, რაც განათლებაა, მაგრამ როცა გაითვალისწინებ, რომ საშუალო ხელფასი ჩვენს ქვეყანაში 1500 ლარს შეადგეს, მიხვდებით, თუ რაოდენ უწევს მთელი აბიტურიენტის ოჯახს იმ 1 წელს თავის შეზღუდვა.
              მაგრამ, არსებობს კიდევ ისეთი შემთხვევები, როცა აბიტურიენტი არ ცხოვრობს მჭიდროდ დასახლებულ პუნქტში. მაგალითად, მოსწავლეს, რომელიც სოფელში ან რაიონში ცხოვრობს, ძალიან დიდი შანსია,
              რომ მაღალი ხარისხის მასწავლებელი არ ჰყავდეს ახლომახლო. ამის გამო, ასეთ მოსწავლეებს, ხშირად ქალაქგარეთ სიარული უწევთ ყოველ გაკვეთილზე, რომ მათვის საჭირო განათლების მიღების შანსი მაინც ჰქონდეთ.
            </h6>
            <h3>დაეხმარე სხვას, საკუთარი თავისთვის</h3>
            <h6>
              სწორედ ამ მიზეზების გამო, ჩვენმა გუნდა გადაწყვიტა, რომ შეექმა ონლაინ პლატფორმა, რომელიც აბიტურიენტებს, სტატისტიკურად ყველაზე რთული საგნის, მათემატიკის სწავლაში დაეხმარებოდა. ჩვენს საიტზე, თქვენ
              შეგიძლიათ ნახოთ ყველა უკვე არსებული ეროვნული გამოცდის ამოცანის ვიდეო განხილვა, რომლებიც სპეციალურად არის ჩაწერილი ამ პლატფორმისთვის, და მოისაზრებს ამოცანების ძალიან მარტივად და სახალისოდ ახსნას.
              კიდევ, შეგიძლიათ ნებისმიერი ეროვნული ტესტი, ჩვენივე საიტზე დაწეროთ, სადაც თქვენ შეგეძლებათ, რომ რეალისტურად ონლაინ სივრცისთვის მორგებული გამოცდის სიმულაცია მოაწყოთ.
              აგრეთვე, მოსწავლეებს, რომლებსაც უკვე მობეზრდათ ერთი და იგივე ტესტების კეთება, შეუძლიათ, რომ ჩვენი ტესტის გენერატორის საშუალებით, 2500-მდე მეტი ამოცანებიდან, შექმნან სრულიად ახალი და უნიკალური
              ტესტი, რომელიც შემდეგ შეუძლიათ რეალურ დროში გააკეთონ. აღსანიშნავია ისიც, რომ ყველა ამოცანას აქვს, თავისი მსგავსი ამოცანების ჩამონათვალი, რაც ნიშნავს, რომ თუ ერთი ამოცანის ტიპზე მუშაობა
              გინდა, სრულიად შესაძლებელია, რომ ამ ამოცანის მსგავს ამოცანებს გადაუყვე და ყველაფერი ისე გააკეთო. კიდევ, ძალიან მოსახერხებელია ის ფაქტიც, რომ ყველა საჭირო თეორია თუ თეორემა, დალაგებულია
              კარგად ჩვენს თეორიების გვერდზე, რომელიც საშუალებას აძლევს მოსწავლეს უცებ და გასაგებად ნახოს მისთვის სასურველი თეორიული ნაწილი. საქმეს აადვილებს ისიც, რომ გვაქვს წინასწარ გამზადებული
              "თეზისების" გვერდი, რომელზეც წერია ხშირად გამოყენებული ფორმულები თუ თეორემები მოკლედ და კონკრეტულად. საბოლოოდ კი, როცა ტესტს დაწერ, ის შენს პერსონალურ Account-ში ინახება, 
              რაც საშუალებას გაძლევს, რომ შენ ტესტს მომავალში გადახედო და ნახო, რამდენად გააუმჯობესე შენი ცოდნა შენი სტატისტიკის მიხედვით. და საბოლოოდ, შენი ნებისმიერი დაწერილი ტესტი, შეგიძლია
              ჩვენი ტესტის გაზიარების სისტემით, გაუზიარო ან შენს მეგობარს ან მასწავლებელს, რაც კიდევ უფრო მოსახერხებელს ხდის სწავლის პროცესს.
            </h6>
            <br />
            <h6>გინდა შენც დაეხმარო სხვებს? <a href="https://www.instagram.com/matka.ge">მოგვწერე შენი იდეა, აზრი აქ, რომ გავაუმჯობესოთ ჩვენი პლატფორმა</a></h6>
            <h6>ფიქრობ, რომ შეგიძლია დაგვეხმარო დეველოპმენტის, ამოცანების ჩაწერის, მასალის მოძიების ან მარკეტინგის მხრივ? <a href="https://docs.google.com/forms/d/1yR7-Hk_OhnZQg45x7grUWe9emNx0UqOCW84SgCWNS6A/edit?ts=65bccd0a">მოგვწერე აქ და ერთად შევქმნათ უკეთესი სასწავლო გარემო</a></h6>
            <h6>გინდა, რომ შენი სახელიც ეწეროს მასწავლებლებლების სიაში? <a href="https://docs.google.com/forms/d/16YalAE6PeyR2UgdWEZVc8-P_5gnCjGsuGasDabQ6uGo/edit?usp=sharing_eil_se_dm&ts=65bccf96">დაგვიკავშირდი აქ, და იშოვე გვერდითი შემოსავალი ბავშვების დახმარებასთან ერთად</a></h6>
            <br />
            <h6>
              და საბოლოოდ, ეს პლატფორმა, არის გაკეთებული ბავშვებისგან, სხვა ბავშვებისთვის. ყველამ, ვინც ამ პროექტზე იმუშავა, ჰქონდა გამოცდილი ეს ყოველივე სტრესული და არასასიამოვნი სიტუაცია ბოლო 1-2 წელიწადში.
              სწორედ ეს გახდა ჩვენთვის ინსპირაცია, რომ შეგვექმნა რაიმე ისეთი, რომელზეც ჩვენი აბიტურიენტობის დროს ვიოცნებებდით.
            </h6>
        </div>
        <div className="AboutUs-OurTeam">
          <h1>ჩვენი გუნდის წევრები</h1>
        </div>
        <div className="AboutUs-OurTeam-Content">
          <ul>
            <li>
              <div className="OurTeam-Label">
                <h3>ანდრია ხვიჩია</h3>
                <h6>კავკასიის უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>tally წარმომადგენელი</li>
                  <li>იდეის ავტორი</li>
                  <li>Full Stack დეველოპერი</li>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>გიორგი ცნობილაძე</h3>
                <h6>აგრარული უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>tally წარმომადგენელი</li>
                  <li>იდეის ავტორი</li>
                  <li>DevOps</li>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>ჯაბა სანგიძე</h3>
                <h6>კავკასიის უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>tally წარმომადგენელი</li>
                  <li>იდეის ავტორი</li>
                  <li>დეველოპერი</li>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>ნიკო ხუსკივაძე</h3>
                <h6>თავისუფალი უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>დეველოპერი</li>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>მარიამ ესიტაშვილი</h3>
                <h6>კავკასიის უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>დეველოპერი</li>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>ლუკა იაკობაშვილი</h3>
                <h6>თბილისის სახელმწიფო სამხატვრო აკადემია</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>გრაფიკული დიზაინერი</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="OurTeam-Label">
                <h3>მიხეილ კალანდარიშვილი</h3>
                <h6>აგრარული უნივერსიტეტი</h6>
              </div>
              <div className="OurTeam-Job">
                <ul>
                  <li>Content შემგროვებელი</li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="AboutUs-Companies">
            <Link to={'https://tally.ge'} target='_blank' className='tally'>
              <img src={process.env.PUBLIC_URL+'/images/DevelopedByTally.png'} alt="Tally Logo" />
            </Link>
            <h1>Matka.ge</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsScreen