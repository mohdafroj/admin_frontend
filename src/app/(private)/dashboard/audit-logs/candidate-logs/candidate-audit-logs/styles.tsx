import styled from "styled-components";

export const StyledWrapper = styled.div`
  .css-10o2lyd-MuiStack-root{
    overflow: hidden;
    margin-top: -8px !important;
  }
  .card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05),
      0px -4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
  }

  .filter-container {
    display: flex;
    margin-bottom: 16px;
    padding: 15px 10px 0 10px;
    justify-content: flex-start;
    gap: 10px;
  }

  .form-control {
    width: 200px;
    margin-right: 10px;
    & .MuiInputBase-root {
      font-size: 16px;
      height: 2.8em;
    }
  }

  .text-field {
    border-radius:5px;
    border-width: 0.5px;
    & .MuiInputBase-root {
      font-size: 16px;
      height: 2.8em;
    }
  }

  .table-container {
    overflow: auto;
    width: 100%;
  }

  .empty-message {
    text-align: center;
    padding: 20px;
    color: #888;
  }
`;