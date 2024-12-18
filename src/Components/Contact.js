import React from 'react';

function Contact() {
  const iconStyle = {
    float: 'right',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <hr/>
      <form>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="col-md-20 mb-3" >
          <label htmlFor="exampleInputPassword1" className="form-label">Type your message</label>
          <input type="text" className="form-control form-control-lg" style={{height: '150px'}} id="exampleInputPassword1" />
        </div>
        <button type="submit" style={iconStyle} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
