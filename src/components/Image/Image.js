import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  rotate(){
    let newRotation = this.state.rotation + 90;
    if(newRotation >= 360){
      newRotation =- 360;
    }
    this.setState({
      rotation: newRotation,
    })
  }

   delete() {
    this.setState({active : false});
    //send to the gallery compnent the id of the img that need to be delete
    this.props.delete(this.props.dto.id)
  }

   expand(dto) {
    console.log(dto);
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          transform: `rotate(${this.state.rotation}deg)`,
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px'
        }}
        >
        <div style={{transform: `rotate(${-1*this.state.rotation}deg)` }}>
          <FontAwesome onClick={()=>this.rotate(this.props.dto)} className="image-icon" name="sync-alt" title="rotate"/>
          <FontAwesome onClick={()=>this.delete(this.props.dto)} className="image-icon" name="trash-alt" title="delete"/>
          <FontAwesome onClick={()=>this.expand(this.props.dto)} className="image-icon" name="expand" title="expand"/>
        </div>
      </div>
    );
  }
}

export default Image;
