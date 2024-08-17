import styled from 'styled-components'

export const FooterStyle = styled('footer')`
  position: relative;
  background-color: #2947A3;
  border-top: 1px solid var(--formBorderColor);
  padding: 20px 0;
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .footerleft {
    padding: 10px 0;
    p {
      color: white;
      font-size: 0.7rem;
    }
  }
  .social {
    h2 {
      color: white;
      font-size: 1rem;
      font-weight: 700;
    }
    ul {
      display: flex;
      gap: 4px;
      li {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        a {
          color: white;
          display: block;
          padding: 5px;
        }
      }
    }
  }
  .footer_link {
    h2 {
      color: white;
      font-size: 1rem;
      font-weight: 700;
    }
    li {
      a {
        color:white;
        font-size: 0.7rem;
      }
    }
  }
  .powered {
    p {
      color: white;
      font-size: 0.7rem;
    }
  }
  .visit {
    margin-bottom: 15px;
    h2 {
      color: white;
      font-size: 0.9rem;
      font-weight: 700;
    }
    p {
      font-size: 0.7rem;
      color: white;
      margin-bottom: 0;
    }
    span {
      font-size: 0.7rem;
      color: white;
    }
  }
`
