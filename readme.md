# The project
Its main purpose is to help me to verify the avarage of time taken to certain requests done through mobile sales smartphone to our server.

The need came when we were suffering with performance issues and I tried to investigate. When I found those logs, it was terible to read so I started to create the formatter.
Initialy it printed data I wanted on console, avarage of time, requests per client, by time... etc. Then I thought to be good to make a frontend to ease its usage.

Since the performance problem stopped, the project didn't evolved too much, but it will be finished with at least basic filters:
- Avarage of requests methods - DONE
- Filter clients - DONE
- Filter time
- Filter quantity of cycles


---
### Contextualizing
Mobile is used to sell consumers products and through the API it communicate with the application server where its consumpsons are added to client's account to be billed.
The mobile app cycle is:
1. User log into system
2. Selects sale point to be logged in (it defines the sale data print route)
3. Input the client's account identification.
4. Select the disired products
5. Finish

Each step shoots an API request which can be seen more easily using this formatter. The count of cycles proposed at the filters list reffers to a sale, from the client identification inputted to products selection and sale finish.