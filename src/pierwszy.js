import React, {useState, useEffect} from 'react';

function Pierwszy(props) {
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {

        const makeAPICall = async () => {
            const response = await fetch('http://127.0.0.1:8001/api/projects/recommendations?type=random-titles', {mode:'cors'});
            const data = await response.json();
            setData(data);
        }
    
        makeAPICall();
        return () => {
          console.log('Component will unmount.');
        };
      }, []); 
  

      const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
      }

      const handleSurname = (e) => {
        setSurname  (e.target.value);
        console.log(email);
      }

      const handleSubmit  = (e)  => {
        console.log(e);
        setEmail({['email']: e.target.value});
        try {
          const response = fetch('http://127.0.0.1:8001/api/projects/enroll', {
            method: 'POST',
            mode: 'cors', // This enables CORS mode
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },
            body: JSON.stringify({ email: email, surname: surname })
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Handle the success response
          const responseData = response.json();
          console.log('Post request successful', responseData);
        } catch (error) {
          // Handle errors
          console.error('Error during POST request:', error);
        }
      };

      
    return (
        <div className="container">
            <h2>Projects avaivable on IT nuke platform:</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Brand</th>
                    <th>General description</th>
                    <th>Subscription</th>
                </tr>
                </thead>
                <tbody>

                {data.map((movie) => (
                    <tr>
                        <td>{movie.brand}</td>
                        <td>E-commerce</td>
                        <td>{movie.desc}</td>
                        <td>  
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".modal">Enroll</button>
                        </td>
                    </tr>
                ))}
    
                </tbody>
            </table>
     
            <div className="modal" tabIndex="-1" role="dialog">
                <form> 
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Please confirm your enrollment in project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">                     
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={handleEmail} className="form-control" id="email" placeholder="Email"/>

                            <label htmlFor="surname">Surname</label>
                            <input type="surname" value={surname} onChange={handleSurname} className="form-control" id="surname" placeholder="surname"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={handleSubmit}>Enroll</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Pierwszy;