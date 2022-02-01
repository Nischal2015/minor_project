import React from "react";

import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import CircularRating from "../../components/UI/Ratings/CircularRatings";
import Price from "../../components/Price/Price";
import Input from "../../components/UI/Input/Input";
import List from "../../components/List/List";
import Slider from "../../components/UI/Slider/Slider";

import profilePic from "../../assets/png/user_hero.png";
import Avatar from "react-avatar";

import styles from "./Talent.module.scss";

const talentLists = [
  {
    id: 111,
    jobheading: "Aman Shakya",
    img: profilePic,
    description:
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
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
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
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
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
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
    img: null,
    description:
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
    skills: ["Eng. Economics", "Traffic Engineering"],
    rating: "90",
  },
  {
    id: 115,
    jobheading: "Basanta Joshi",
    img: profilePic,
    description:
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
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
      "This section is dedicated for the short description of the freelancer themself. The bio must be short and consise, and must clearly explain what expertise do the particular freelancers hold. If possible the bio must contain information such as the DOB, and the age of the person. It should also contain the name of the university of the person who is seeking to be a freelancer.",
    skills: [
      "Object Oriented Design",
      "UML Patterns",
      "Object Oriented Analysis",
    ],
    rating: "13",
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
          <div className={styles.results__pagination}></div>
        </Card>
      </Container>
    </section>
  );
};

export default Talent;
