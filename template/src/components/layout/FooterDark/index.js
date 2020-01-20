import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

class FooterDark extends React.Component {
  render() {
    const {
      settings: { isContentNoMaxWidth },
    } = this.props
    return (
      <div
        className={classNames(style.footerDark, {
          [style.footerFullWidth]: isContentNoMaxWidth,
        })}
      >
        <div className="bg-dark-1 py-5 text-gray-6">
          <div className={style.container}>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <h4 className="text-white font-weight-bold mb-4 mb-lg-5">Quick Links</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <a className="mb-1" href="#">
                        Documentation
                      </a>
                      <a className="mb-1" href="#">
                        Service Rules
                      </a>
                      <a className="mb-1" href="#">
                        User Settings
                      </a>
                      <a className="mb-1" href="#">
                        Dashboard Setings
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column mb-4">
                      <a className="mb-1" href="#">
                        User Settings
                      </a>
                      <a className="mb-1" href="#">
                        Dashboard Settings
                      </a>
                      <a className="mb-1" href="#">
                        Documentation
                      </a>
                      <a className="mb-1" href="#">
                        Service Rules
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <h4 className="text-white font-weight-bold mb-4 mb-lg-5">Get In Touch</h4>
                <input
                  className="text-gray-6 border-dark-2 bg-dark-2 form-control mb-4"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="col-md-12 col-lg-4">
                <h4 className="text-white font-weight-bold mb-4 mb-lg-5">About</h4>
                <p>
                  Air UI is a set of modern professional Html / React / Vue and Angular based
                  templates. This is a powerful and super flexible tool, which suits best for any
                  kind of web application: Web Sites, Web Applications, Hybrid Apps, CRM, CMS, Admin
                  Panels, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black py-4">
          <div className={style.container}>
            <div className="d-sm-flex align-items-sm-center">
              <div className={`clearfix mb-3 mr-sm-auto ${style.logo}`}>
                <img src="../../../../resources/images/air-logo.png" alt="Air UI" />
                <div className={style.logoName}>AIR UI</div>
                <div className={style.logoDescr}>Admin Template</div>
              </div>
              <div className="d-flex flex-column flex-sm-row">
                <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                  About
                </a>
                <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                  Terms of Use
                </a>
                <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FooterDark)
