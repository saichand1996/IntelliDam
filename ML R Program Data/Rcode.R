

###     R code for Rainfall Prediction    ###

# Loading required package: caTools
install.packages("caTools")
library(caTools)
install.packages("aws.s3")
library(aws.s3)

# specifying keys as environment variables
Sys.setenv("AWS_ACCESS_KEY_ID" = "3bd40fd6c0e840c2acd618a8a2f6408e",
           "AWS_SECRET_ACCESS_KEY" = "1807ace97f632e51fa62717b8b8c2dd03ad3082becff3f75",
           "AWS_S3_ENDPOINT" = "s3.eu.cloud-object-storage.appdomain.cloud")

# reading object/file from R in the form of Raw object
usercsvobj <-get_object("s3://rainfallpredictionalgorithm-donotdelete-pr-q71zfvcq5l3gzi/Allparameters.csv")
usercsvobj

# converting raw object in to desired type of object
csvcharobj <- rawToChar(usercsvobj)
con <- textConnection(csvcharobj) 
dataset <- read.csv(con)
close(con)
dataset

# other alternative reading dataset from local path
dataset = read.csv("C:/users/srbobbil/Desktop/CC_Rainfall/Allparameters.csv")

#generates the random number
set.seed(50000)

#splits the dataset  
split = sample.split(dataset$RainfallPrecipitated, SplitRatio=0.8)

#dividing the dataset in to training_set & test_set
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)
model<-lm(RainfallPrecipitated ~ Air.Temperature + Geo.Potential.Height + SpecificHumidity + u.wind + v.wind, data=training_set)

#summaries the result of model
summary(model)

#Predict 
predict_val<-predict(model, test_set) 
pred_table<-test_set
pred_table$pred_val<-predict_val
predict_val

#displays the error
RMSE(pred_table$RainfallPrecipitated, pred_table$pred_val)

# reading data from IBM weather API to predict the data 
API= GET("https://api.weather.com//v1/geocode//17.6868//83.2185//observations.json?units=m&language=en-US&apiKey=5424e9662cbf4bc3a4e9662cbf4bc3fe")
names(API)
API$times
API$status_code
API$headers
API$headers$`content-type`
text_content <- content(API,"text",encoding ="UTF-8")
text_content
parsed_content <- content(API, "parsed")
names(parsed_content)
parsed_content$observation$pressure
parsed_content$observation$rh
parsed_content$observation$temp
parsed_content$observation$wc
parsed_content$observation$wdir
parsed_content$observation$wdir_cardinal
parsed_content$observation$wspd


#for loop is used to find estimated rainfall value for a given parameters
j=1
for(i in pred_table$RainfallPrecipitated){
  if(is.na(i)){
    Output[j] <- pred_table$pred_val[j]
  } 
  else{
    Output[j] <- i
  }
  j=j+1
}
#appending column to an existing dataset
pred_table <-cbind(pred_table,Output)  

#writes the data in to csv file and saves in a local
write.csv(pred_table, file ="C:/users/srbobbil/Desktop/Rainfall/output.csv")

# placing object/file in to cloud storage from local
aws.s3::put_object("output.csv", bucket = "rainfallpredictionalgorithm-donotdelete-pr-q71zfvcq5l3gzi")











