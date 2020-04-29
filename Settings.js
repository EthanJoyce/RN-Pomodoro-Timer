import React from 'react'
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
	CheckRow,
  SliderRow,
} from 'react-native-settings-page'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      workTime: global.WORK_TIME,
      freeTime: global.FREE_TIME,
    }
  }

  _navigateToScreen = () => {
    const { navigation } = this.props
    navigation.navigate('Counter')
  }

  render() {
    return (
      <ReactNativeSettingsPage>
        <SectionRow text='Settings'>
          <NavigateRow
            text='Return'
            iconName='cog'
            onPressCallback={this._navigateToScreen}
          />
          <SliderRow
            text={'Work Time: ' + this.state.workTime + ' mins'}
            iconName='clock-o'
            _color='#0011EE'
            _value={global.WORK_TIME}
            _min={5}
            _max={90}
            _onValueChange={value =>  {
                global.WORK_TIME = Math.floor(value)
                this.setState({
                  workTime: Math.floor(value),
                })
              }}
          />
          <SliderRow
            text={'Free Time: ' + this.state.freeTime + ' mins'}
            iconName='clock-o'
            _color='#0011EE'
            _value={global.FREE_TIME}
            _min={5}
            _max={90}
            _onValueChange={value =>  {
                global.FREE_TIME = Math.floor(value)
                this.setState({
                  freeTime: Math.floor(value),
                })
              }}
          />
        </SectionRow>
      </ReactNativeSettingsPage>
    )
  }
}