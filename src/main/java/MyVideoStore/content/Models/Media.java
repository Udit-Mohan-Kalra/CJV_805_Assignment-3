package MyVideoStore.content.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "media")
public class Media {
    @Id
    private String id;  // Auto generated id.
    private String name;
    private String synopsis;
    private String type;
    private String smallPoster;
    private String largePoster;
    private double purchasePrice;
    private double rentPrice;
    private boolean isFeatured;

    //Getters and Setters for all the fields.
    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getSynopsis(){
        return synopsis;
    }
    public void setSynopsis(String synopsis){
        this.synopsis = synopsis;
    }
    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getSmallPoster(){
        return smallPoster;
    }
    public void setSmallPoster(String posterPath){
        this.smallPoster = posterPath;
    }
    public String getLargePoster(){
        return largePoster;
    }
    public void setLargePoster(String largePoster){
        this.largePoster = largePoster;
    }
    public double getPurchasePrice(){
        return purchasePrice;
    }
    public void setPurchasePrice(double purchasePrice){
        this.purchasePrice = purchasePrice;
    }
    public double getRentPrice(){
        return rentPrice;
    }
    public void setRentPrice(double rentPrice){
        this.rentPrice = rentPrice;
    }
    public boolean isFeatured(){
        return isFeatured;
    }
    public void setFeatured(boolean isFeatured){
        this.isFeatured = isFeatured;
    }
    
}
