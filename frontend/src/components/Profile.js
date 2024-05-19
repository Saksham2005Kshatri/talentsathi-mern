// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
// import { Button } from "react-bootstrap";

// const Profile = () => {
//   const userInfo = useSelector((state) => state.auth);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState();
//   const [city, setCity] = useState("");
//   const [job, setJob] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userInfo) {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setAge(userInfo.age);
//       setCity(userInfo.city);
//       setJob(userInfo.job);
//       setPhoneNumber(userInfo.phoneNumber);
//     }
//   }, [userInfo]);

//   return (
//     <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col col-lg-6 mb-4 mb-lg-0">
//             <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
//               <div className="row g-0">
//                 <div
//                   className="col-md-4 gradient-custom text-center text-white"
//                   style={{
//                     borderTopLeftRadius: ".5rem",
//                     borderBottomLeftRadius: ".5rem",
//                     backgroundColor: "#14213d",
//                   }}
//                 >
//                   <img
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
//                     alt="Avatar"
//                     className="img-fluid my-5"
//                     style={{ width: "80px" }}
//                   />
//                   {console.log(userInfo.userInfo.name)}
//                   <h5>{userInfo.userInfo.name}</h5>
//                   <p>{userInfo.userInfo.email}</p>
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body p-4">
//                     <h6>Information</h6>
//                     <hr className="mt-0 mb-4" />
//                     <div className="row pt-1">
//                       <div className="col-6 mb-3">
//                         <h6>City</h6>
//                         <p className="text-muted">{userInfo.userInfo.city}</p>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <h6>Phone</h6>
//                         <p className="text-muted">
//                           {userInfo.userInfo.phoneNumber}
//                         </p>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <h6>Age</h6>
//                         <p className="text-muted">{userInfo.userInfo.age}</p>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <h6>Job</h6>
//                         <p className="text-muted">{userInfo.userInfo.job}</p>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <LinkContainer to="/profile/update">
//                           <Button
//                             className="btn btn-lg"
//                             style={{
//                               backgroundColor: "#0077b6",
//                               color: "white",
//                             }}
//                           >
//                             Update
//                           </Button>
//                         </LinkContainer>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <button
//                           className="btn btn-lg"
//                           style={{ backgroundColor: "#d90429", color: "white" }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Profile;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useDeleteMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteProfile, { isLoading }] = useDeleteMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAge(userInfo.age);
      setCity(userInfo.city);
      setJob(userInfo.job);
      setPhoneNumber(userInfo.phoneNumber);
    }
  }, [userInfo]);

  const handleDeleteButton = async (e) => {
    e.preventDefault();
    console.log("Hello delete button");
    if (window.confirm("Are you sure you want to delete? ")) {
      try {
        await deleteProfile(userInfo._id).unwrap();
        // clear credentials
        dispatch(clearCredentials());
        navigate("/");
        toast.success("Profile deleted");
      } catch (error) {
        toast.error(error.error);
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                    backgroundColor: "#14213d",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  {console.log(userInfo.userInfo.name)}
                  <h5>{userInfo.userInfo.name}</h5>
                  <p>{userInfo.userInfo.email}</p>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>City</h6>
                        <p className="text-muted">{userInfo.userInfo.city}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">
                          {userInfo.userInfo.phoneNumber}
                        </p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Age</h6>
                        <p className="text-muted">{userInfo.userInfo.age}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Job</h6>
                        <p className="text-muted">{userInfo.userInfo.job}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <LinkContainer to="/profile/update">
                          <Button
                            className="btn btn-lg"
                            style={{
                              backgroundColor: "#0077b6",
                              color: "white",
                            }}
                          >
                            Update
                          </Button>
                        </LinkContainer>
                      </div>
                      <div className="col-6 mb-3">
                        <Button
                          className="btn btn-lg"
                          style={{
                            backgroundColor: "#d90429",
                            color: "white",
                          }}
                          onClick={handleDeleteButton}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
