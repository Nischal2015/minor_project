import React from "react";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Price from "../../components/Price/Price";

import styles from "./Work.module.scss";

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
  {
    id: 6,
    name: "Your Skill 6",
  },
  {
    id: 7,
    name: "Your Skill 7",
  },
  {
    id: 8,
    name: "Your Skill 8",
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

          {/* Filters pricing section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>
            <Input type='text' variant='small'></Input>

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
            <p>jahsfdhsakdfj</p>
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
