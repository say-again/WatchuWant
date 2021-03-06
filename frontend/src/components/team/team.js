import React, { PureComponent } from 'react'
import './team.scss';
import Person from './person';

export default class Team extends PureComponent {

  render() {
    return (
      <div className='fadeMe' id="team-page">
        <Person
          name={"John Chau"}
          github={"https://github.com/jwchau"}
          linkedin={"https://linkedin.com/in/jwchau"}
          angelco={"https://angel.co/john-chau-4"}
          photo={"/people/john.png"}
          portfolio={"https://john-chau.com"}
        />

        <Person
          name={"Try Khov"}
          github={"https://github.com/trykhov"}
          linkedin={"https://www.linkedin.com/in/tckhov/"}
          angelco={"https://angel.co/try-khov"}
          portfolio={"https://trykhov.com"}
          photo={"https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/390/medium/Try_Khou_2.jpg?1578536628"}
        />

        <Person
          name={"Alex De Guzman"}
          github={"https://github.com/alexdeeguz"}
          linkedin={"https://www.linkedin.com/in/alex-de-guzman/"}
          angelco={"https://angel.co/alexdeeguz"}
          photo={"https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/403/medium/Alex_De_Guzman_2.jpg?1578518723"}
          portfolio={""}
        />

        <Person
          name={"Kendra Odrunia"}
          github={"https://github.com/kendraodru"}
          linkedin={"https://www.linkedin.com/in/kendra-odrunia-9272441a4/"}
          angelco={"https://angel.co/kendra-odrunia"}
          portfolio={"https://kendraodru.tech"}
          // photo={"https://youth-to-the-people-seeds.s3-us-west-1.amazonaws.com/contact/park.JPG"}
          photo={"https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/387/medium/Kendra_Odrunia_3.jpg?1578532870"}
        />
      </div>
    )
  }
}
