# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**1. Create agents_facilities Table** - *Time estimates - 8 hours*

Acceptance criteria:
- A new table is added to database called "agents_facilities" with fields PK "id", FK "facility_id", FK "agent_id", custom_id
- Create methods to create, read, delete and update
- The create method doesn't allow a Facility set a custom_id that already exists for another Agent.
- Test coverage for all methods.

Implementation Details:
- Run a migration to create "agents_facilities".
- Create the API methods with the endpoint /agentsfacilities.
- Create an errorHandler that doesn't allow Facilities from set a custom_id for another Agent that already exist.
- Write a test coverage for each method you create.

**2. Add Custom ID Input on UI** - *Time estimate - 3 hours*

Acceptance Criteria:
- An input field has been added to the UI that allow Facilities insert and update each Agent a custom_id.
- Now the UI display custom_id for each Agent and no longer the internal ID of the database

Implementation Details:
- Add a new input field for custom_id to the UI based on what was developed by the designer.
- Update the UI to display custom_id and not consider the internal database id for each Agent.

**3. Change 'generateReport' to use custom_id** - *Time estimates - 2 hours*

Acceptance criteria:
- generateReport uses custom_id instead of the internal database id for each Agent.

Implementation Details:
- Change generateReport function to use custom_id instead of the internal database id for each Agent.


