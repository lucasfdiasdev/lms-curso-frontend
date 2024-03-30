import Heading from "@/utils/heading";

const AdminPage = () => {
  return (
    <div>
      <Heading
        title={`Admin profile`}
        description="LMS is a plataform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <p>Dashboard page (protected)</p>
    </div>
  );
};

export default AdminPage;
