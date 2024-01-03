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
                    </div>
                </div>
            </div>
            <div className="HomeScreen-Stats">
                <div className="Stats-Wrapper">
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <PercentIcon className='Icon'></PercentIcon>
                        </div>
                        <div className="Stats-Number">
                            2 500-ზე მეტი
                        </div>
                        <div className="Stats-Name">
                            ამოცანა
                        </div>
                    </div>
                    <div className='Stats-Div'>
                        <div className="Stats-Icon">
                            <ArticleIcon className='Icon'></ArticleIcon>
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
                            <EmojiObjectsIcon className='Icon'></EmojiObjectsIcon>
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
                            <MenuBookIcon className='Icon'></MenuBookIcon>
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
                                    ყველა ეროვნული გამოცდის ამოცანას გააჩნია ამოხსნა.
                                </li>
                                <li>
                                    ადვილად გასაგები ვიდეო ამოხსნები, რომელიც გათვლილია ბავშვებისთვის, ვისაც მინიმალური ცოდნაც კი გააჩნიათ.
                                </li>
                                <li>
                                    ამოცანების მსგავსი ამოცანები, რათა ამოცანაში განხილული საკითხების ცოდნა კიდე უფრო გაიღრმაოთ.
                                </li>
                            </ul>
                        </div>
                        <div className="Right-Button">
                            <Link to={'/Test'}>
                                <Button variant='contained'>
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
                                    სპეციალურად შექმნილი პატარა თეზისები, რომლებიც არის ადვილად მოსაძებნი და Straight To The Point.
                                </li>
                            </ul>
                        </div>
                        <div className="Left-Button">
                            <Link to={'/Theory'}>
                                <Button variant='contained'>
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
                            <strong id='Title'>მასწავლებელს?</strong>
                        </div>
                        <div className="Right-Bottom">
                            <ul>
                                <li>
                                    ნახე ჩვენი რეკომენდირებული მასწავლებლები, რომლებთანაც პირადად გვქონია გამოცდილება როგორც მასწავლებელთან ან როგორც საქმიან კოლეგასთან.
                                </li>
                                <li>
                                    მოძებნე შენთვის სასურველი მასწავლებელი
                                </li>
                            </ul>
                        </div>
                        <div className="Right-Button">
                            <Link to={'/teachers'}>
                                <Button variant='contained'>
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
                                Matka.ge-ს მიზანია, რომ საშუალება მისცეს სკოლის მოსწავლეებს, რომ წარმატებით გაიარონ და გადალახონ ის წელი, რომელსაც აბიტურიენტობის დროს გადიან.
                                ჩვენი პლატფორმა ქმნის საშუალებას, რომ მოსწავლეებს მინიმალურად, ან საერთოდაც აღარ დასჭირდეთ დამატებითი მასწავლებლებთან 1 წელი (ზოგჯერ უფრო დიდი ხანიც) მომზადება.
                                გარდა იმისა, რომ ეს ყველაფერი ძალიან დამღლელია, მასწავლებლების ფასი ძალიან ძვირია (ხშირად წელიწადში $800+), რისი საშუალებაც ბევრ ახალგაზრდას არ აქვს.
                                <br />
                                <br />
                                აგრეთვე, პლატფორმა შექმნილია სრულიად უნივერსიტეტის ბავშვების მიერ, რომლებსაც არ ჰქონიათ არანაირი ფინანსური მოტივაცია, გარდა იმისა, რომ შეექმნათ ისეთი
                                პლატფორმა, როგორზეც ისინი ოცნებობდნენ აბიტურიენტობის დროს.
                                
                            </div>
                            <div className="Left-Button">
                                <Link to={'/Theory'}>
                                    <Button variant='contained'>
                                        გაიგე მეტი
                                    </Button>
                                </Link>
                                <Link to={'/Theory'}>
                                    <Button 
                                    color='primary'
                                    variant='contained'>
                                        მოგვწერე წერილი
                                    </Button>
                                </Link>
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