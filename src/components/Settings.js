// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {clearAuthState, editUser} from '../actions/auth'

// class Settings extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       height: '',
//       weight:'',
//       goal:'',
//       target:'',
//       editMode: false,
//     };
//   }

//   handleChange = (fieldName,val) => {

//     this.setState({
//         [fieldName]: val
//     })

//   }
  
//   handleSave = () => {

//     const {height, weight, goal, target} = this.state;

//     const {user} = this.props.auth;

//     this.props.dispatch(editUser(height,weight,goal,target,user._id))

//   }

//   componentWillUnmount(){
//       this.props.dispatch(clearAuthState())
//   }

//   render() {
//     const { user,error } = this.props.auth;
//     const { editMode } = this.state;
//     console.log('wewewwewew',user.weight)

//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
//             alt="user-dp"
//           />
//         </div>

//         {error && <div className="alert error-dailog">{error}</div>}
//         {error ===false && <div className="alert success-dailog">Successfully Updated Profile</div>}

//         <div className="field">
//           <div className="field-label">Email</div>
//           <div className="field-value">{user.email}</div>
//         </div>

//          <div className="field">
//           <div className="field-label">Name</div>
          
//             <div className="field-value">{user.name}</div>
          
//         </div>

//         <div className="field">
//           <div className="field-label">Height</div>
//           {editMode ? (
//             <input
//               type="text"
//               onChange={(e) => this.handleChange('height',e.target.value)}
//               value={this.state.height}
//               placeholder='cm'
//             />
//           ) : (
//             <div className="field-value">{user.height}</div>
//           )}
//         </div>

//         <div className="field">
//           <div className="field-label">Weight</div>
//           {editMode ? (
//             <input
//               type="text"
//               onChange={(e) => this.handleChange('weight',e.target.value)}
//               value={this.state.weight}
//               placeholder='kg'
//             />
//           ) : (
            
//             <div className="field-value">{user.weight}</div>
//           )}
//         </div>

//         <div className="field">
//           <div className="field-label">Goal</div>
//           {editMode ? (
//             <input
//               type="text"
//               onChange={(e) => this.handleChange('goal',e.target.value)}
//               value={this.state.goal}
//               placeholder='weight gain / weight loss'
//             />
//           ) : (
            
//             <div className="field-value">{user.goal}</div>
//           )}
//         </div>

//         <div className="field">
//           <div className="field-label">Target Weight</div>
//           {editMode ? (
//             <input
//               type="text"
//               onChange={(e) => this.handleChange('target',e.target.value)}
//               value={this.state.target}
//               placeholder='kg'
//             />
//           ) : (
            
//             <div className="field-value">{user.target}</div>
//           )}
//         </div>


//         {/* {editMode && (
//           <div className="field">
//             <div className="field-label">New Password</div>
//             <input
//               type="password"
//               onChange={(e) => this.handleChange('password',e.target.value)}
//               value={this.state.password}
//             />
//           </div>
//         )}

//         {editMode && (
//           <div className="field">
//             <div className="field-label">Confirm Password</div>
//             <input
//               type="password"
//               onChange={(e) => this.handleChange('confirmPassword',e.target.value)}
//               value={this.state.confirmPassword}
//             />
//           </div>
//         )} */}

//         <div className="btn-grp">
//             {editMode ? <button className="button save-btn" onClick={this.handleSave} >Save</button> :
//             <button className="button edit-btn" onClick={() => this.handleChange('editMode',true)}>Edit Profile</button> }
//         </div>

//         {editMode && <div className="go-back" onClick={() => this.handleChange('editMode',false)}>
//             Go Back</div>}

       
//       </div>
//     );
//   }
// }

// function mapStateToProps({ auth }) {
//   return {
//     auth,
//   };
// }

// export default connect(mapStateToProps)(Settings);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clearAuthState, editUser} from '../actions/auth'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
      role:'',
      address:'',
      phonenumber:'',
      hours:'',
      dob:'',
      gender:'',
      skills:''
    };
  }

  handleChange = (fieldName,val) => {

    this.setState({
        [fieldName]: val
    })

  }
  
  handleSave = () => {

    const {password, confirmPassword, name,address,phonenumber,hours,dob,gender,skills} = this.state;

    const {user} = this.props.auth;

    this.props.dispatch(editUser(name,password,confirmPassword,user._id,user.role,address,phonenumber,hours,dob,gender,skills))

  }

  componentWillUnmount(){
      this.props.dispatch(clearAuthState())
  }
  render() {
    const { user,error } = this.props.auth;
    const { editMode } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        {error && <div className="alert error-dailog">{error}</div>}
        {error ===false && <div className="alert success-dailog">Successfully Updated Profile</div>}

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name',e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('password',e.target.value)}
              value={this.state.password}
            />
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('confirmPassword',e.target.value)}
              value={this.state.confirmPassword}
            />
          </div>
        )}
        <div className="field">
          <div className="field-label">Address</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('address',e.target.value)}
              value={this.state.address}
              placeholder='Address'
            />
          ) : (
            
            <div className="field-value">{user.address}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Phone Number</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('phonenumber',e.target.value)}
              value={this.state.phonenumber}
              placeholder='Phone Number'
            />
          ) : (
            
            <div className="field-value">{user.phonenumber}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Available Hours</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('hours',e.target.value)}
              value={this.state.hours}
              placeholder='Hours'
            />
          ) : (
            
            <div className="field-value">{user.hours}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">DOB</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('dob',e.target.value)}
              value={this.state.dob}
              placeholder='DOB'
            />
          ) : (
            
            <div className="field-value">{user.dob}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Gender</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('gender',e.target.value)}
              value={this.state.gender}
              placeholder='Gender'
            />
          ) : (
            
            <div className="field-value">{user.gender}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Skills</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('skills',e.target.value)}
              value={this.state.skills}
              placeholder='Skills'
            />
          ) : (
            
            <div className="field-value">{user.skills}</div>
          )}
        </div>

        <div className="btn-grp">
            {editMode ? <button className="button save-btn" onClick={this.handleSave} >Save</button> :
            <button className="button edit-btn" onClick={() => this.handleChange('editMode',true)}>Edit Profile</button> }
        </div>

        {editMode && <div className="go-back" onClick={() => this.handleChange('editMode',false)}>
            Go Back</div>}

        <div style={{color:'red', marginTop:'20px',fontWeight:'bolder'}}>Donot change your information if you have logged in from Google</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Settings);