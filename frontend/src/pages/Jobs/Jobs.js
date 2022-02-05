import React from "react";

import Budget from "../../components/SideList/Budget";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import List from "../../components/List/List";
import Price from "../../components/Price/Price";

import styles from "./Jobs.module.scss";
import PostedTime from "../../components/SideList/PostedTime";

// DUMMY data for skills
// will be replaced by data obtained from API
const skills = [
  {
    id: 1,
    name: "Your Skill 1",
  },
  {
    id: 2,
    name: "Your Skill 2",
  },
  {
    id: 3,
    name: "Your Skill 3",
  },
  {
    id: 4,
    name: "Your Skill 4",
  },
  {
    id: 5,
    name: "Your Skill 5",
  },
];

export const jobLists = [
  {
    id: 111,
    jobheading: "Youtube Thumbnail Creator Required",
    description:
      "This section of the job list is for the descrioption of the posted job. The description must be precise and upto the point and must not contain any ubiquitous information that may detrack the freelancers the requirements of the job",
    skills: ["Photoshop", "Lightroom", "Photography"],
    budget: "45-60",
    posted: "Posted 15 days ago",
  },
  {
    id: 112,
    jobheading: "Frontend React Developer",
    description:
      "This section of the job list is for the descrioption of the posted job. The description must be precise and upto the point and must not contain any ubiquitous information that may detrack the freelancers the requirements of the job",
    skills: [
      "Javascript",
      "React",
      "HTML",
      "CSS",
      "Frontend Development",
      "Responsive Design",
      "Next JS",
    ],
    budget: "145-190",
    posted: "Posted 6 days ago",
  },
  {
    id: 113,
    jobheading: "NodeJs Backend Developer",
    description:
      "This section of the job list is for the descrioption of the posted job. The description must be precise and upto the point and must not contain any ubiquitous information that may detrack the freelancers the requirements of the job",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    budget: "600-750",
    posted: "Posted 2 hours ago",
  },
  {
    id: 114,
    jobheading: "Advertisement Creator",
    description:
      "This section of the job list is for the descrioption of the posted job. The description must be precise and upto the point and must not contain any ubiquitous information that may detrack the freelancers the requirements of the job",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    budget: "125-150",
    posted: "Posted 5 days ago",
  },
];

const Work = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const updatedItems = lists.filter((list) =>
  //   list.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const searchDataHandler = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <section className={styles.section__work}>
      <Container className={styles.work}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Price section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>

            <Searchbar variant='small' />

            <ul className={styles.filter__skills__list}>
              {skills.map(({ id, name }) => (
                <li key={id}>
                  <input type='checkbox' id={id} />
                  <label htmlFor={id}>{name}</label>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* This is for the results display section */}
        <Card className={styles.results} variant='boxy'>
          <div className={styles.results__heading}>
            <h3 className='heading--tertiary'>Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {jobLists.map(({ id, budget, posted, ...jobList }) => (
              <div className={styles.list} key={id}>
                <div className={styles.list__text}>
                  <List id={id} {...jobList} />
                </div>

                <div className={styles.list__number}>
                  <Budget budget={budget} />
                  <PostedTime posted={posted} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.results__pagination}></div>
        </Card>

        {/* <div>
          <Searchbar value={searchTerm} onSearch={searchDataHandler} />
        </div>

        <ul>
          {updatedItems.map(({ id, ...list }) => (
            <li key={id}>
              <span>{list.name}</span>
            </li>
          ))}
        </ul> */}
      </Container>
    </section>
  );
};

export default Work;
