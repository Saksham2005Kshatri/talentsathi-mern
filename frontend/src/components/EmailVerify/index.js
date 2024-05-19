import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "./success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        console.log("id params: ", param.id);
        console.log("token params: ", param.token);
        const url = `http://localhost:8000/api/auth/signup/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log("Here is the data SADFSDAFASDF ", data);
        setValidUrl(true);
      } catch (error) {
        console.error(
          "Verification failed:",
          error.response ? error.response.data : error.message
        );

        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
