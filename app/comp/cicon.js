import React, { Component, PureComponent } from 'react';
import { 
    View, 
    Image 
} from 'react-native';
import { Styles, Colors } from '../lib/styles';


export default class Cicon extends Component {

    // [TIPS] always consider to use shouldComponentUpdate() or PureComponent.
    shouldComponentUpdate(nextProps, nextState) {

        if(nextProps.sid === null){
            return true;
        }
        
        if(this.props.id === nextProps.sid){
            return true;
        }
        else if(this.props.id === this.props.sid){
            if(this.props.sid !== nextProps.sid){
                return true;
            }
        }
        

        return false;
    }

    render() {
        return (
            <View 
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: this.props.color,
                    ...this.props.style
                }}>
                <Image style={this.props.iconSize} source={this.props.icon}/>
            </View>
        );
    }
}
Cicon.defaultProps = {
    iconSize: Styles.icon18,
    color: Colors.lightGrey
}
