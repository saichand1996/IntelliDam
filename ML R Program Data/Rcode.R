###  R code for Rainfall Prediction 
# Loading required package: caTools
install.packages("caTools")
library(caTools)
#reading dataset
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
RMSE(pred_table$RainfallPrecipitated, pred_table$pred_val)
#for loop to display prediction value
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
#writes the data in to csv file and saves in a loction
write.csv(pred_table, file ="C:/users/srbobbil/Desktop/Rainfall/outputTEST11.csv")
### to store in cloud
library(aws.s3)
install.packages("aws.s3")
# specifying keys as environment variables
Sys.setenv("AWS_ACCESS_KEY_ID" = "3bd40fd6c0e840c2acd618a8a2f6408e",
           "AWS_SECRET_ACCESS_KEY" = "1807ace97f632e51fa62717b8b8c2dd03ad3082becff3f75",
           "AWS_S3_ENDPOINT" = "s3.eu.cloud-object-storage.appdomain.cloud")
# putting local file into S3
put_object(file = "outputTEST11.csv",object = "outputTEST11.csv" bucket = "rainfallpredictionalgorithm-donotdelete-pr-q71zfvcq5l3gzi")


