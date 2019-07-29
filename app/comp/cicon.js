import React, { Component } from 'react';
import { 
    View, 
    Image 
} from 'react-native';
import { Styles, Colors } from '../lib/styles';


export default class Cicon extends Component {

    render() {
        return (
            <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: this.props.color,
                    ...this.props.style
                }}>
                    <Image style={Styles.icon18} 
                    source={this.props.icon}/>
            </View>
        );
    }
}
Cicon.defaultProps = {
    color: Colors.lightGrey
}
