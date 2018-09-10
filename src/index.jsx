import React, { Component
  // , PropTypes as T
} from 'react'
import './style.css'
import E from 'wangeditor'


export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.value || ''
    }
  }


  // static propTypes = {
  //   onChange: T.func,
  //   value: T.string,
  //   style: T.object,     // height & width
  // }

  static defaultProps = {
    style: {
      height: 200,
      width: 700
    }
  }

  onEditorChange = (html) => {

    html = html || this.__editor__.$txt.html()
    this.setState({
      content: html
    }, () => {
      this.props.onChange && this.props.onChange(html)
    })
    
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.value && nextProps.value) {
      this.__editor__.$txt.html(nextProps.value)
      this.onEditorChange(nextProps.value)
    }
  }

  componentDidMount() {

    this.__editor__ = new E(this.editorElem)

    // only for 2.x|1.x
    this.__editor__.onchange = this.onEditorChange
    const { config, value } = this.props
    if(config) {
      Object.keys(config).forEach(key => {
        this.__editor__.config[key] = config[key]
      })
    }
    this.__editor__.create()

    // init
    if (value) {
      this.__editor__.$txt.html(value)
      this.onEditorChange(value)
    }
  }


  componentWillUnmount() {
    this.__editor__ = null
    delete this.__editor__
  }

  render() {

    let { style } = this.props

    return (<div className="react-antd-wangeditor" ref={el => this.editorElem=el}  style={style}></div>)
  }

  // api
  html = () => {
    return this.__editor__.$txt.html()
  }
  clear = () => {
    this.__editor__.$txt.html('')
  }
  disable = () => {
    this.__editor__.$textElem.attr('contenteditable', false)
  }
  enable = () => {
    this.__editor__.$textElem.attr('contenteditable', true)
  }

}
