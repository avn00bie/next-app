import React from "react";

interface Props {
  params: { id: number };
}

const UserDatailPage = ({ params: { id } }: Props) => {
  return <div>UserDatailPage {id} </div>;
};

export default UserDatailPage;
