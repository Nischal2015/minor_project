// import React from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
// import styles from "./Input.module.scss";

// const LoginInput = ({ type, name, placeholder, register, errors }) => {
//   return (
//     <div className={styles["form-control"]}>
//       {type === "number" ? (
//         <React.Fragment>
//           <input
//             className={styles.input__text}
//             type={type || "text"} // email
//             name={name} // email
//             placeholder={placeholder} // Email address
//             aria-required='true'
//             {...register(name, { required: true })}
//           />

//           {errors[name] && (
//             <p className={styles.error}>&#9888; This field is required</p>
//           )}
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <input
//             className={styles.input__text}
//             type={type || "text"} // email
//             name={name} // email
//             placeholder={placeholder} // Email address
//             aria-required='true'
//             {...register(name)}
//           />

//           {errors[name] && (
//             <p className={styles.error}>
//               <span>
//                 <FaExclamationTriangle />
//               </span>
//               {errors[name]?.message}
//             </p>
//           )}
//         </React.Fragment>
//       )}
//     </div>
//   );
// };

// export default LoginInput;

import React from "react";
import styles from "./Input.module.scss";

const LoginInput = ({ type, name, placeholder, register, errors }) => {
  return (
    <div className={styles["form-control"]}>
      {(() => {
        if (type === "number") {
          return (
            <React.Fragment>
              <input
                className={styles.input__text}
                type={type || "text"} // email
                name={name} // email
                placeholder={placeholder} // Email address
                aria-required='true'
                min='1'
                step='any'
                {...register(name, { required: true, valueAsNumber: true })}
              />

              {errors[name] && (
                <p className={styles.error}>This field is required</p>
              )}
            </React.Fragment>
          );
        } else if (type === "file") {
          return (
            <React.Fragment>
              <input
                className={styles.input__text}
                type={type || "text"} // email
                name={name} // email
                placeholder={placeholder} // Email address
                aria-required='true'
                accept='image/*,.pdf,.doc,.docx'
                // value={selectedFile}
                {...register(name, {
                  required: true,
                })}
              />
              {errors[name] && (
                <p className={styles.error}>This field is required</p>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <input
                className={styles.input__text}
                type={type || "text"} // email
                name={name} // email
                placeholder={placeholder} // Email address
                aria-required='true'
                {...register(name)}
              />

              {errors[name] && (
                <p className={styles.error}>{errors[name]?.message}</p>
              )}
            </React.Fragment>
          );
        }
      })()}
    </div>
  );
};

export default LoginInput;
