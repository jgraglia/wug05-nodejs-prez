
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

public class CloseableJedisPool implements AutoCloseable {

    private final JedisPool jedisPool;

    private transient Jedis resource;

    public CloseableJedisPool(final JedisPool jedisPool) {
        this.jedisPool = jedisPool;
    }

    public Jedis getResource() {
        if (resource != null) {
            return resource;
        }
        resource = jedisPool.getResource();
        return resource;
    }

    @Override
    public void close() throws JedisConnectionException {
        if (resource != null) {
            jedisPool.returnResource(resource);
        }
        jedisPool.destroy();
    }

}
