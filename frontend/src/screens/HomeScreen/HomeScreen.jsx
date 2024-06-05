import React from 'react';
import './HomeScreen.scss';

import ArticleIcon from '@mui/icons-material/Article';
import PercentIcon from '@mui/icons-material/Percent';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import {Button} from '@mui/material';

import {Link} from 'react-router-dom';

function HomeScreen() {
    return (
        <div className='HomeScreen'>
            <div className="HomeScreen-Main">
                <video autoPlay muted loop>
                    <source src={process.env.PUBLIC_URL+'/videos/HomeVideo.mp4'} />
                </video>
                <div className="HomeScreen-Main-Contents">
                    <div className="Contents-Wrapper">
                        <div className="Contents-Label">
                            <h1>
                                გახადე ეროვნულები მარტივი
                            </h1>
                        </div>
                        <div className="Contents-CallButton">
                            <Link to='/test'>
                                <Button
                                className='StartTestButton'
                                variant='contained'
                                >ტესტის დაწყება</Button>
                            </Link>
                        </div>
                        <div class="mouse"
                        onClick={() => {
                            const element = document.getElementById(`HomeScreenStats`);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        ><span></span></div>
                    </div>
                </div>
            </div>
            <div className="HomeScreen-Stats" id='HomeScreenStats'>
                <div className="Stats-Wrapper">
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <Link to={'/solutions'}>
                                <PercentIcon className='Icon'></PercentIcon>
                            </Link>
                        </div>
                        <div className="Stats-Number">
                            2 500-ზე მეტი
                        </div>
                        <div className="Stats-Name">
                            მათემატიკის ამოცანა
                        </div>
                    </div>
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <Link to={'/test'}>
                                <ArticleIcon className='Icon'></ArticleIcon>
                            </Link>
                        </div>
                        <div className="Stats-Number">
                            50 ზე მეტი
                        </div>
                        <div className="Stats-Name">
                            ახალი ტესტი
                        </div>
                    </div>
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <Link to={'/test'}>
                                <EmojiObjectsIcon className='Icon'></EmojiObjectsIcon>
                            </Link>
                        </div>
                        <div className="Stats-Number">
                            ამოცანების
                        </div>
                        <div className="Stats-Name">
                            ვიდეო ამოხსნები
                        </div>
                    </div>
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <Link to={'/theory'}>
                                <MenuBookIcon className='Icon'></MenuBookIcon>
                            </Link>
                        </div>
                        <div className="Stats-Number">
                            გაადვილებული
                        </div>
                        <div className="Stats-Name">
                            თეორია
                        </div>
                    </div>
                </div>
            </div>
            <div className="HomeScreen-Problems">
                <div className="Problems-Wrapper">
                    <div className="Problems-Left">
                        <img src={process.env.PUBLIC_URL+'/images/ProblemHero.png'} alt="" />
                    </div>
                    <div className="Problems-Right">
                        <div className="Right-Top">
                            ყველა ამოცანას აქვს
                            <br />
                            <strong id='Title'>ამოხსნა</strong>
                        </div>
                        <div className="Right-Bottom">
                            <ul>
                                <li>
                                    ყველა მათემატიკის ეროვნული გამოცდის ამოცანას გააჩნია ამოხსნა.
                                </li>
                                <li>
                                    ადვილად გასაგები ვიდეო ამოხსნები, რომელიც გათვლილია ბავშვებისთვის, ვისაც მინიმალური ცოდნაც კი გააჩნიათ მათემატიკაში.
                                </li>
                                <li>
                                    ამოცანების მსგავსი ამოცანები, რათა ამოცანაში განხილული საკითხების ცოდნა კიდე უფრო გაიღრმაოთ.
                                </li>
                            </ul>
                        </div>
                        <div className="Right-Button">
                            <Link to={'/Test'}>
                                <Button variant='contained' className='HomeScreenButton'>
                                    დაიწყე ტესტი
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="HomeScreen-Theory">
                <div className="Theory-Wrapper">
                    <div className="Theory-Left">
                        <div className="Left-Top">
                            განხილულია ყველა საჭირო
                            <br />
                            <strong id='Title'>თეორია</strong>
                        </div>
                        <div className="Left-Bottom">
                            <ul>
                                <li>
                                    დეტალურად განხილული საკითხები ალგებრაში.
                                </li>
                                <li>
                                    დეტალურად განხილული საკითხები გეომეტრიაში.
                                </li>
                                <li>
                                    სპეციალურად შექმნილი პატარა თეზისები, რომლებიც არის ადვილად მოსაძებნი და გასაგები.
                                </li>
                            </ul>
                        </div>
                        <div className="Left-Button">
                            <Link to={'/Theory'}>
                                <Button variant='contained' className='HomeScreenButton'>
                                    თეორია
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="Theory-Right">
                        <img src={process.env.PUBLIC_URL+'/images/TheoryHero.png'} alt="" />
                    </div>
                </div>
            </div>
            <div className="HomeScreen-Teachers">
                <div className="Teachers-Wrapper">
                    <div className="Teachers-Left">
                        <img src={process.env.PUBLIC_URL+'/images/TeachersHero.png'} alt="" />
                    </div>
                    <div className="Teachers-Right">
                        <div className="Right-Top">
                            მაინც ეძებ
                            <br />
                            <strong id='Title'>მათემატიკის მასწავლებელს?</strong>
                        </div>
                        <div className="Right-Bottom">
                            <ul>
                                <li>
                                    ნახე ჩვენი რეკომენდირებული მათემატიკის მასწავლებლები, რომლებთანაც პირადად გვქონია გამოცდილება როგორც მასწავლებელთან ან როგორც საქმიან კოლეგასთან.
                                </li>
                                <li>
                                    მოძებნე შენთვის სასურველი მათემატიკის მასწავლებელი
                                </li>
                            </ul>
                        </div>
                        <div className="Right-Button">
                            <Link to={'/teachers'}>
                                <Button variant='contained' className='HomeScreenButton'>
                                    მოძებნე მასწავლებელი
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="HomeScreen-AboutUs">
                <div className="AboutUs-Wrapper">
                    <div className="AboutUs-Label">
                        ჩვენს შესახებ
                    </div>
                    <div className="AboutUs-Contents">
                        <div className="AboutUs-Left">
                            <div className="Left-Top">
                                ბავშვებისგან,
                                <br />
                                <strong id='Title'>სხვა ბავშვებისთვის</strong>
                            </div>
                            <div className="Left-Bottom">
                                Matka.ge არის ვებ-გვერდი, რომლის არსებობასაც ალბათ აბიტურიენტობის წლებში ყველა ოცნებობდა.საიტზე თავმოყრილია 2005 წლიდან მოყოლებული ყველა მათემატიკის ერთიანი ეროვნული გამოცდის მათემატიკის ტესტი,თავიანთი ამოხსნებითა და თეორიით. 
                                ჩვენი მიზანია, დავეხმაროთ სკოლის მოსწავლეებს აბიტურიენტობის რთული პერიოდის წარმატებით გადალახვაში. Matka.ge უზრუნველყოფს, რომ სკოლის მოსწავლეებს მინიმალურად, ან საერთოდ აღარ დასჭირდეთ მასწავლებელთან მთელი წლის განმავლობაში მომზადება, რადგაან ეს 
                                დაღლილობასთან ერთად დიდ ფინანსურ ხარჯთანაც ასოცირდება,რისი საშუალებაც ხშირ შემთხვევაში არ არის. 
                                <br />
                                <br />
                                პლატფორმა შექმნილია სრულიად სტუდენტების მიერ,რომელთაც არანაირი ფინანსური სარგებელი არ სურთ, მათი ერთადერთი მიზანია დაეხმარონ აბიტურიენტებს ცხოვრების ამ რთულ მონაკვეთში და შეუქმნან მათ ის კომფორტი,რომელიც თავად არ გააჩნდათ.
                                <br />
                                <br />
                                Matka.ge - გახადე ეროვნული გამოცდები მარტივი!
                            </div>
                            <div className="Left-Button">
                                <Link to={'/aboutUs'}>
                                    <Button variant='contained' className='HomeScreenButton'>
                                        გაიგე მეტი
                                    </Button>
                                </Link>
                                <Button
                                    className='HomeScreenButton' 
                                    color='primary'
                                    onClick={() => {
                                        const element = document.getElementById(`contactUsComponent`);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    variant='contained'>
                                        მოგვწერე წერილი
                                </Button>
                            </div>
                        </div>
                        <div className="AboutUs-Right">
                            <img src={process.env.PUBLIC_URL+'/images/AboutUsHero.png'} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen