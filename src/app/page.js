// "use client"
// import {useState} from 'react';
// import styles from './page.module.css'
// import axios from 'axios'

// export default function Home() {
//   const [insert, setInsert] = useState(false);

//   function handlerSubmit(event) {
//     event.preventDefault();

//     const data = new FormData(event.target)

//     const email = data.get('email')
//     const password = data.get('password')
//     const nameProduct = data.get('nameProduct')
//     const description = data.get('description')
//     const company = data.get('company')
//     const price = data.get('price')
//     const amount = data.get('amount')

//     axios.get(`http://localhost:3005/auth/login?email=${email}&password=${password}`)
//     .then(e => {
//       const token = e.data.token;

//       axios.post(
//         `http://localhost:3005/products`,
//         {
//           name: nameProduct,
//           description,
//           company,
//           price,
//           amount
//         },
//         {
//           headers: {
//             authorization:token
//           }
//         }
//       ).then(element => {
//         if (element && element.data && element.data.message === 'Product created') {
//           setInsert(true)
//         }
//       })
//     })
//   }

//   function formProcess() {
//     if (insert) {
//       return (
//         <main>
//           <span>Inserção ocorreu com sucesso</span>
//         </main>
//       )
//     }

//     return (
//       <main>
//         <h1>Produtos</h1><form onSubmit={handlerSubmit}>

//         <div className={styles.colum}>

//           <div>
//             <label>
//               E-mail
//             </label>
//           </div>
//           <div>
//             <input type="email" name="email"></input>
//           </div>

//           <div>
//             <label>
//               Senha
//             </label>
//           </div>
//           <div>
//             <input type="password" name="password"></input>
//           </div>

//         </div>

//         <div className={styles.colum}>

//           <div>
//             <div>
//               <label>Nome do Produto</label>
//             </div>
//             <div>
//               <input type="text" name="nameProduct" />
//             </div>
//           </div>

//           <div>
//             <div>
//               <label>Descrição</label>
//             </div>
//             <div>
//               <input type="text" name="description" />
//             </div>
//           </div>

//           <div>
//             <div>
//               <label>Empresa</label>
//             </div>
//             <div>
//               <input type="text" name="company" />
//             </div>
//           </div>


//           <div>
//             <div>
//               <label>Preço</label>
//             </div>
//             <div>
//               <input type="number" name="price" />
//             </div>
//           </div>


//           <div>
//             <div>
//               <label>Quantidade</label>
//             </div>
//             <div>
//               <input type="number" name="amount" />
//             </div>
//           </div>
//         </div>

//         <div className={styles.lineButton}>
//           <button>Login</button>
//         </div>

//       </form>
//       </main>
//     );
//   }

//   return (
//     <main>
//       {formProcess()}
//     </main>
//   )
// }
//  "use client"
//  import React, { useState } from 'react';
//  import styles from './page.module.css';
//  import axios from 'axios';
 
//  export default function Home() {
//    const [formData, setFormData] = useState({
//      email: '',
//      password: '',
//      nameProduct: '',
//      description: '',
//      company: '',
//      price: '',
//      amount: ''
//    });
 
//    const [insert, setInsert] = useState(false);
//    const [errorMessage, setErrorMessage] = useState('');
//    const [notFoundMessage, setNotFoundMessage] = useState('');
 
//    const handleChange = (event) => {
//      const { name, value } = event.target;
//      setFormData({ ...formData, [name]: value });
//    };
 
//    const handleSubmit = async (event) => {
//      event.preventDefault();
 
//      try {
//        const loginResponse = await axios.get(`http://localhost:3005/auth/login`, {
//          params: {
//            email: formData.email,
//            password: formData.password
//          }
//        });
 
//        const token = loginResponse.data.token;
 
//        if (loginResponse.data.userNotFound) {
//          setNotFoundMessage('Esse usuário não existe. Por favor, registre um usuário que exista.');
//          setErrorMessage('');
//          return;
//        }
 
//        const productResponse = await axios.post(
//          `http://localhost:3005/products`,
//          {
//            name: formData.nameProduct,
//            description: formData.description,
//            company: formData.company,
//            price: formData.price,
//            amount: formData.amount
//          },
//          {
//            headers: {
//              authorization: token
//            }
//          }
//        );
 
//        if (productResponse.data.message === 'Product created') {
//          setInsert(true);
//          setNotFoundMessage('');
//          setErrorMessage('');
//        }
//      } catch (error) {
//        if (error.response && error.response.status === 401) {
//          setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
//          setNotFoundMessage('');
//        } else {
//          console.error('Erro ao enviar requisição:', error);
//        }
//      }
//    };
 
//    return (
//      <main>
//        <h1>Produtos</h1>
//        <form onSubmit={handleSubmit}>
//          <div className={styles.column}>
//            <div>
//              <label>E-mail</label>
//            </div>
//            <div>
//              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//            </div>
 
//            <div>
//              <label>Senha</label>
//            </div>
//            <div>
//              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//            </div>
//          </div>
 
//          <div className={styles.column}>
//            <div>
//              <label>Nome do Produto</label>
//            </div>
//            <div>
//              <input type="text" name="nameProduct" value={formData.nameProduct} onChange={handleChange} />
//            </div>
 
//            <div>
//              <label>Descrição</label>
//            </div>
//            <div>
//              <input type="text" name="description" value={formData.description} onChange={handleChange} />
//            </div>
 
//            <div>
//              <label>Empresa</label>
//            </div>
//            <div>
//              <input type="text" name="company" value={formData.company} onChange={handleChange} />
//            </div>
 
//            <div>
//              <label>Preço</label>
//            </div>
//            <div>
//              <input type="number" name="price" value={formData.price} onChange={handleChange} />
//            </div>
 
//            <div>
//              <label>Quantidade</label>
//            </div>
//            <div>
//              <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
//            </div>
//          </div>
 
//          {notFoundMessage && (
//            <div className={styles.notFoundClass}>
//              <p>{notFoundMessage}</p>
//            </div>
//          )}
 
//          {errorMessage && (
//            <div className={styles.error}>
//              <p>{errorMessage}</p>
//            </div>
//          )}
 
//          <div className={styles.lineButton}>
//            <button type="submit">Enviar</button>
//          </div>
//        </form>
//      </main>
//    );
//  }
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nameProduct: '',
    description: '',
    company: '',
    price: '',
    amount: ''
  });

  const [insert, setInsert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await axios.get(`http://localhost:3005/auth/login`, {
        params: {
          email: formData.email,
          password: formData.password
        }
      });

      if (loginResponse.data.userNotFound) {
        setNotFoundMessage('Esse usuário não existe. Por favor, registre um usuário que exista.');
        setErrorMessage('');
        return;
      }

      const token = loginResponse.data.token;

      const productResponse = await axios.post(
        `http://localhost:3005/products`,
        {
          name: formData.nameProduct,
          description: formData.description,
          company: formData.company,
          price: formData.price,
          amount: formData.amount
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      if (productResponse.data.message === 'Product created') {
        setInsert(true);
        setNotFoundMessage('');
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
        setNotFoundMessage('');
      } else {
        console.error('Erro ao enviar requisição:', error);
        setErrorMessage('Erro ao enviar requisição. Por favor, tente novamente.');
        setNotFoundMessage('');
      }
    }
  };

  return (
    <main>
      {insert ? (
        <span>Inserção ocorreu com sucesso</span>
      ) : (
        <>
          <h1>Produtos</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.column}>
              <div>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.column}>
              <div>
                <label>Nome do Produto</label>
                <input
                  type="text"
                  name="nameProduct"
                  value={formData.nameProduct}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Descrição</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Preço</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Quantidade</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {notFoundMessage && (
              <div className={styles.notFoundClass}>
                <p>{notFoundMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className={styles.errorClass}>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className={styles.lineButton}>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </>
      )}
    </main>
  );
}
