import React from "react";

import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import CircularRating from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Price from "../../components/Price/Price";
import Input from "../../components/UI/Input/Input";
import List from "../../components/List/List";
import Slider from "../../components/UI/Slider/Slider";
import StarRatings from "../../components/UI/Ratings/StarRatings/StarRatings";

import profilePic from "../../assets/png/user_hero.png";
import Avatar from "react-avatar";

import styles from "./Talent.module.scss";

const talentLists = [
  {
    id: 111,
    jobheading: "Aman Shakya",
    img: profilePic,
    description:
      "My name is Aman Shakya. I teach TOC, Software Engineering, DBMS in Pulchowk Engineering Campus. Sometimes, I like to laugh between the middle of lecture on my own jokes, but many students don't consider them to be funny.",
    skills: [
      "TOC",
      "DBMS",
      "Reinforcement Learning",
      ".NET Framework",
      "Java",
      "Backend Development",
      "Software Engineering",
    ],
    rating: "32",
  },
  {
    id: 112,
    jobheading: "Anil Verma",
    img: null,
    description:
      "My name is Anil Verma. I teach Computer Graphics, OS in Pulchowk Campus. Sometimes I am quite lazy to take the classes, so I just cancel the class.",
    skills: [
      "Computer Graphics",
      "OS",
      "Illustrator",
      "Photoshop",
      "Powerpoint",
    ],
    rating: "60",
  },
  {
    id: 113,
    jobheading: "Anand Kumar Shah",
    img: null,
    description:
      "My name is Anand Kumar Shah. I teach Embedded System in Pulchowk Engineering Campus. I like to explain things in details so that students can understand thoroughly. Hence, my classes sometimes go beyond the time limit set by the college routine.",
    skills: [
      "Embedded System",
      "Microcontroller Design",
      "Computer Organization",
    ],
    rating: "75",
  },
  {
    id: 114,
    jobheading: "Roshan Karki",
    img: profilePic,
    description:
      "My name is Roshan Karki. I teach Engineering Economics and possibly am the only teacher outside of DOECE to teach this semester. I love numbers hence I teach economics, though not pure Economics as you may think. I often like to ask questions to my students while they are solving a certain numerical. I also make students read a certain passage of my slide and ask them what they understood.",
    skills: ["Eng. Economics", "Traffic Engineering"],
    rating: "90",
  },
  {
    id: 115,
    jobheading: "Basanta Joshi",
    img: null,
    description:
      "My name is Basanti Joshi and I am Asst. professsor in Pulchowk Campus. I teach Artificial Intelligence and give assignments right during the end of the class. The assignments deadline is generally 20 mins. to 1 hour after the end of the class.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Algorithms",
    ],
    rating: "43",
  },
  {
    id: 116,
    jobheading: "Lok Nath Regmi",
    img: profilePic,
    description:
      "I don't need to introduce myself but if you need my name, my name is Lok Nath Regmi. I teach OOAD. Recently, I was assigned judge for the minor project defense. During my class, students are generally sleepy or they are not paying attention.",
    skills: [
      "Object Oriented Design",
      "UML Patterns",
      "Object Oriented Analysis",
    ],
    rating: "21",
  },
];

const ratingsCriteria = [
  { id: 1, name: "Reliability" },
  { id: 2, name: "Punctual" },
  { id: 3, name: "Communication Skills" },
  { id: 4, name: "Quality Work" },
];

const Talent = () => {
  return (
    <section className={styles.section__work}>
      <Container className={styles.talent}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Filters pricing section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Ratings</h4>
            {ratingsCriteria.map(({ id, name }) => (
              <Slider key={id} text={name} />
            ))}

            {/* <Slider text='Reliability' />
            <br />
            <Slider text='Punctual' />
            <br />
            <Slider text='Communication Skill' />
            <br />
            <Slider text='Rating Criteria' /> */}
          </div>

          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>
            <Input type='text' variant='small'></Input>
          </div>
        </Card>

        <Card className={styles.results} variant='boxy'>
          <div className={styles.results__heading}>
            <h3 className='heading--tertiary'>Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {talentLists.map(({ id, rating, img, ...jobList }) => (
              <div className={styles.list} key={id}>
                <picture className={styles.list__picture}>
                  {img === null ? (
                    <Avatar
                      name={jobList.jobheading}
                      round={true}
                      size='100%'
                      textSizeRatio={1}
                      alt='Name Initials Avatar'
                    />
                  ) : (
                    <Avatar
                      src={img}
                      round={true}
                      size='100%'
                      textSizeRatio={1}
                      alt='Profile Avatar'
                    />
                  )}
                </picture>

                <div className={styles.list__text}>
                  <List {...jobList} />
                </div>

                <div className={styles.list__number}>
                  <CircularRating>{rating}</CircularRating>
                  <Button variant='secondary small'>See More &rarr;</Button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.results__pagination}>
            <StarRatings />
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default Talent;
