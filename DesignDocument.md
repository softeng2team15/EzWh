# Design Document 


Authors: Group 33

Date: 27/04/2022

Version: 1.0


# Contents

- [High level design](#package-diagram)
- [Low level design](#class-diagram)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)

# Instructions

The design must satisfy the Official Requirements document, notably functional and non functional requirements, and be consistent with the APIs 

# High level design 

<discuss architectural styles used, if any>
<report package diagram, if needed>

Architecture:

- EZWh is a stand-alone application.

Architectural patterns:

- MVC (with the V on the frontend and the MC on the backend)
- layered - 3 tiered

The three layers are:

- Presentation Logic
- BAL: Business Access Layer
- DAL: Data Access Layer

![HLD Picture](./DesignDocument_Screenshot/HLD.png)


# Low level design

<for each package in high level design, report class diagram. Each class should detail attributes and operations>

![Design Class diagram](./DesignDocument_Screenshot/lowLevelDesignChange1.png)


# Verification traceability matrix

\<for each functional requirement from the requirement document, list which classes concur to implement it>


![Traceability Matrix Picture](./DesignDocument_Screenshot/traceabilityMatrix.jpg)


# Verification sequence diagrams 
\<select key scenarios from the requirement document. For each of them define a sequence diagram showing that the scenario can be implemented by the classes and methods in the design>

Sequence Diagram for Scenarios 1-2:

![Sequence_1-2](./DesignDocument_Screenshot/sequence_1-2.png)

Sequence Diagram for Scenarios 2-1:

![Sequence_2-1](./DesignDocument_Screenshot/sequence_2-1.png)

Sequence Diagram for Scenarios 4-1:

![Sequence_4-1](./DesignDocument_Screenshot/sequence_4-1.png)

Sequence Diagram for Scenarios 5-2-1:

![Sequence_5-2-1](./DesignDocument_Screenshot/sequence_5-2-1.png)

Sequence Diagram for Scenarios 6-2:

![Sequence_6-2](./DesignDocument_Screenshot/sequence_6-2.png)

Sequence Diagram for Scenarios 9-1:

![Sequence_9-1](./DesignDocument_Screenshot/sequence_9-1.png)

Sequence Diagram for Scenarios 11-1:

![Sequence11-1](./DesignDocument_Screenshot/sequence_11-1.png)

Sequence Diagram for Scenarios 12-1:

![Sequence_12-1](./DesignDocument_Screenshot/sequence_12-1.png)

