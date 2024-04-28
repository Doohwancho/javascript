import React from "react";
import styled from "styled-components";
import { Usage as CompoundComponent } from "./01.compound-component/Usage";
import { Usage as ControlProps } from "./02.control-props/Usage";
import { Usage as CustomHooks } from "./03.custom-hooks/Usage";
import { Usage as PropsGetters } from "./04.props-getters/Usage";
import { Usage as StateReducer } from "./05.state-reducer/Usage";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faPlusCircle,
  faPlusSquare,
  faMinus,
  faMinusCircle,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlus,
  faPlusCircle,
  faPlusSquare,
  faMinus,
  faMinusCircle,
  faMinusSquare
);

export default function ReactPatterns() {
  return (
    <>
      <StyledContainer>
        <StyledTitleContainer>
          <h1>Advanced React ReactPatterns</h1>
        </StyledTitleContainer>

        <StyledPatternContainer>
          <h2>1. Compound component pattern</h2>
          <CompoundComponent />
        </StyledPatternContainer>

        <StyledPatternContainer>
          <h2>2. Control props pattern</h2>
          <ControlProps />
        </StyledPatternContainer>

        <StyledPatternContainer>
          <h2>3. Custom hooks pattern</h2>
          <CustomHooks />
        </StyledPatternContainer>

        <StyledPatternContainer>
          <h2>4. Props PropsGetters pattern</h2>
          <PropsGetters />
        </StyledPatternContainer>

        <StyledPatternContainer>
          <h2>5. State reducer ReactPatterns</h2>
          <StateReducer />
        </StyledPatternContainer>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  text-align: center;
  font-family: sans-serif;
`;

const StyledTitleContainer = styled.div`
  background-color: #1428a0;
  color: white;
  padding: 35px;

  > h1 {
    margin: 0;
  }
`;

const StyledPatternContainer = styled.div`
  padding: 30px;
  border-bottom: 2px solid #d3d3d3;

  &:last-child {
    border: none;
  }

  > h2 {
    margin-top: 0;
  }
`;