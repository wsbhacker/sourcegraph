import * as H from 'history'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ExtensionsControllerProps } from '../../../../../shared/src/extensions/controller'
import { PlatformContextProps } from '../../../../../shared/src/platform/context'
import { Logo1, Logo2 } from './logos'

interface Props extends ExtensionsControllerProps, PlatformContextProps {
    isLightTheme: boolean
    location: H.Location
    history: H.History
}

/**
 * The welcome main page, which describes Sourcegraph functionality and other general information.
 */
export class WelcomeMainPage extends React.Component<Props> {
    public render(): JSX.Element | null {
        return (
            <div className="welcome-main-page">
                <section className="hero-section">
                    <div className="container hero-container mt-5 pt-3">
                        <div className="row justify-content-md-center">
                            <div className="col-md-6">
                                <img
                                    className="mb-1 d-none"
                                    src={
                                        this.props.isLightTheme
                                            ? 'https://about.sourcegraph.com/sourcegraph/logo.svg'
                                            : 'https://about.sourcegraph.com/sourcegraph/logo--light.svg'
                                    }
                                />
                                <img
                                    className="mb-1"
                                    style={{ width: '1.5rem', height: '1.5rem' }}
                                    src="/.assets/img/sourcegraph-mark.svg"
                                />
                                {/* <h1>Sourcegraph</h1> */}
                                <h2 className="mt-2" style={{ fontSize: '24px' }}>
                                    <span className="font-weight-normal">
                                        Search,&nbsp;navigate, and review&nbsp;code.
                                    </span>{' '}
                                    Find&nbsp;answers.
                                </h2>
                                <p>Sourcegraph is a code search and navigation tool for dev teams.</p>
                                <ul className="pl-3">
                                    <li>
                                        <strong>Code search:</strong> fast, works on any commit (no indexing delay),
                                        with support for regexps, punctuation, diffs, and{' '}
                                        <a href="https://docs.sourcegraph.com/user/search/queries" target="_blank">
                                            filters
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Code intelligence:</strong> go-to-definition and find-references for{' '}
                                        <a
                                            href="https://sourcegraph.com/extensions?query=category%3A%22Programming+languages%22"
                                            target="_blank"
                                        >
                                            most languages
                                        </a>
                                        , provided by{' '}
                                        <a href="https://docs.sourcegraph.com/extensions" target="_blank">
                                            extensions
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Deep integrations</strong> with your{' '}
                                        <a
                                            href="https://docs.sourcegraph.com/integration/browser_extension"
                                            target="_blank"
                                        >
                                            code host and review tools
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/sourcegraph/sourcegraph" target="_blank">
                                            Open-source
                                        </a>
                                        , self-hosted, and free (paid{' '}
                                        <a href="https://about.sourcegraph.com/pricing" target="_blank">
                                            Enterprise
                                        </a>{' '}
                                        upgrade available)
                                    </li>
                                </ul>
                                <p className="mb-1">
                                    <a href="https://docs.sourcegraph.com/user/tour" target="_blank">
                                        See how it's used
                                    </a>{' '}
                                    to build better software faster at:
                                </p>
                                <div className="welcome-main-page__customer-logos d-flex align-items-center pl-2">
                                    <Logo1
                                        className="welcome-main-page__customer-logo welcome-main-page__customer-logo-1 mr-3"
                                        isLightTheme={this.props.isLightTheme}
                                    />
                                    <Logo2
                                        className="welcome-main-page__customer-logo welcome-main-page__customer-logo-2 mr-4"
                                        isLightTheme={this.props.isLightTheme}
                                    />
                                    <span className="small text-muted">
                                        &hellip;and thousands of other organizations
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5 pt-4">
                                <ul className="list-unstyled">
                                    <li>
                                        <span className="text-uppercase text-muted font-weight-bold d-block small">
                                            For your organization's code:
                                        </span>
                                        <a
                                            className="btn btn-primary font-weight-bold mb-1"
                                            href="https://docs.sourcegraph.com/#quickstart"
                                        >
                                            Deploy self-hosted Sourcegraph
                                        </a>
                                        <small className="text-muted d-block">
                                            Docker (recommended, 1-command setup), Kubernetes, other clusters, or
                                            source. Runs securely on your infra.
                                        </small>
                                    </li>
                                    <li className="mt-4">
                                        {/* TODO!(sqs): make this different if signed in */}
                                        <span className="text-uppercase text-muted font-weight-bold d-block small">
                                            For everyone:
                                        </span>
                                        <a
                                            className="btn btn-secondary mb-1"
                                            href="https://docs.sourcegraph.com/integration/browser_extension"
                                        >
                                            Install browser extension
                                        </a>{' '}
                                        <small className="text-muted d-block">
                                            Adds go-to-definition and find-references to GitHub and other code hosts.
                                        </small>
                                    </li>
                                    <li className="mt-2">
                                        {/* TODO!(sqs): make this different if signed in */}
                                        <Link to="/sign-in" target="_blank">
                                            Sign up on Sourcegraph.com
                                        </Link>
                                        <small className="text-muted d-block">For public code only.</small>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-8 mt-5 pt-2 d-flex justify-content-center">
                                <iframe
                                    width="728"
                                    height="410"
                                    src="https://www.youtube.com/embed/Pfy2CjeJ2N4"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-5 d-none">
                    <h2>Advanced code search</h2>
                    <h1>Find. Then replace.</h1>
                    <p>
                        Search in files and diffs on your private code using simple terms, regular expressions, and
                        other filters.
                    </p>
                    <p>
                        Syncs repositories with your code host and supports searching any commit/branch, with no
                        indexing delay.
                    </p>
                    <Link className="btn btn-secondary" to="/welcome/search">
                        Explore code search
                    </Link>
                </section>
                <section className="d-none">
                    <h2>Enhanced code browsing and intelligence</h2>
                    <h1>Mine your language.</h1>
                    <p>
                        Solve problems before they exist, commit by commit. Code intelligence makes browsing code
                        easier, with IDE-like hovers, go-to-definition, and find-references on your code, powered by
                        Sourcegraph extensions and language servers based on the open-source Language Server Protocol.
                    </p>
                    <p>It even works in code review diffs on GitHub and GitLab with our browser extensions.</p>
                    <Link className="btn btn-secondary" to="/welcome/code-intelligence">
                        Explore code intelligence
                    </Link>
                </section>
                <section className="d-none">
                    <h2>Integrations</h2>
                    <h1>Get it. Together.</h1>
                    <p>
                        Connect your Sourcegraph instance with your existing tools. Get code intelligence while browsing
                        code on the web, and code search from your editor.
                    </p>
                    <Link className="btn btn-secondary" to="/welcome/integrations">
                        Explore integrations
                    </Link>
                </section>
                <div className="row d-none">
                    <section className="col-lg-6 col-md-12">
                        <h2>Deploy Sourcegraph</h2>
                        <h1>Free. For all.</h1>
                        <p>
                            The pace at which humans can write code is the only thing that stands between us and flying
                            cars, a habitat on Mars, and a cure for cancer. That's why developers can get started and
                            deploy Sourcegraph for free, and contribute to our code on GitHub.
                        </p>
                        <a className="btn btn-primary" href="https://docs.sourcegraph.com/#quickstart">
                            Deploy Sourcegraph
                        </a>
                        <a
                            className="btn btn-secondary"
                            href="https://github.com/sourcegraph/sourcegraph/"
                            target="_blank"
                        >
                            Sourcegraph on GitHub
                        </a>
                    </section>
                    <section className="col-lg-6 col-md-12">
                        <h2>Sourcegraph pricing</h2>
                        <h1>Size. Up.</h1>
                        <p>
                            When you grow to hundreds or thousands of users and repositories, scale up instantly, and
                            protect your uptime with Sourcegraph on Kubernetes, external backups, and custom support
                            agreements. Start with Sourcegraph Core for free and scale with your deployment.
                        </p>
                        <a className="btn btn-secondary" href="https://about.sourcegraph.com/pricing/">
                            Sourcegraph pricing
                        </a>
                    </section>
                </div>
                <section className="d-none">
                    <h2>Open. For business.</h2>
                    <h1>Sourcegraph is open source.</h1>
                    <p>
                        We opened up Sourcegraph to bring code search and intelligence to more developers and developer
                        ecosystems—and to help us realize the{' '}
                        <a href="https://about.sourcegraph.com/plan/">Sourcegraph master plan</a>. We're also excited
                        about what this means for Sourcegraph as a company. All of our customers, many with hundreds or
                        thousands of developers using Sourcegraph internally every day, started out with a single
                        developer spinning up a Sourcegraph instance and sharing it with their team. Being open-source
                        makes it even easier to use Sourcegraph.
                    </p>
                    <a
                        className="btn btn-primary"
                        href="https://about.sourcegraph.com/blog/sourcegraph-is-now-open-source/"
                    >
                        Release announcement
                    </a>
                    <a className="btn btn-secondary" href="https://github.com/sourcegraph/sourcegraph/">
                        Sourcegraph on GitHub
                    </a>
                </section>
            </div>
        )
    }
}
